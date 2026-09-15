const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const {createRequire} = require('node:module');
const upstream = require('@axinom/docusaurus-plugin-papersaurus');
const upstreamRequire = createRequire(require.resolve('@axinom/docusaurus-plugin-papersaurus'));
const express = upstreamRequire('express');
const puppeteer = upstreamRequire('puppeteer');

// Papersaurus reads build-time HTML. Hydrate a temporary copy first so Mermaid,
// collapsed MDX content and lazy images are included without changing the site.
module.exports = function portfolioPdf(context, options) {
  return {
    name: 'portfolio-pdf',
    async postBuild(props) {
      const force = process.env.BUILD_PDF || '';
      if (force.startsWith('0') || (!options.autoBuildPdfs && !force.startsWith('1'))) return;
      const docsPlugin = props.plugins.find(plugin => plugin.name === 'docusaurus-plugin-content-docs');
      const versions = docsPlugin.content.loadedVersions.map(version => {
        if (!options.includeDocs) return version;
        for (const id of options.includeDocs) {
          if (!version.docs.some(doc => doc.id === id)) throw new Error(`PDF document not found: ${id}`);
        }
        return {...version, sidebars: Object.fromEntries(
          Object.entries(version.sidebars).map(([name, items]) => [name,
            !options.sidebarNames.length || options.sidebarNames.includes(name)
              ? options.includeDocs.map(id => ({type: 'doc', id})) : items,
          ]),
        )};
      });
      const pdfProps = {...props, plugins: props.plugins.map(plugin => plugin === docsPlugin
        ? {...plugin, content: {...plugin.content, loadedVersions: versions}} : plugin)};
      const snapshot = await fs.mkdtemp(path.join(os.tmpdir(), 'pomodoro-pdf-'));
      let browser;
      let server;
      try {
        await fs.cp(context.outDir, snapshot, {recursive: true});
        const app = express();
        app.use(context.baseUrl, express.static(context.outDir));
        server = await new Promise((resolve, reject) => {
          const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
          listener.once('error', reject);
        });
        const origin = `http://127.0.0.1:${server.address().port}`;
        browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']});
        const page = await browser.newPage();
        await page.setViewport({width: 1200, height: 900});
        await page.evaluateOnNewDocument(() => localStorage.setItem('theme', 'light'));
        // Embedded videos are represented by their source links in print.
        // Embed successfully loaded external images so the second rendering pass
        // does not depend on another GitHub request for each individual PDF.
        const remoteImages = new Map();
        page.on('response', response => {
          if (response.request().resourceType() !== 'image' || !response.ok() || new URL(response.url()).origin === origin) return;
          const image = response.buffer().then(buffer => `data:${response.headers()['content-type'] || 'image/png'};base64,${buffer.toString('base64')}`);
          // Attach a handler immediately; a failed read is reported below.
          image.catch(() => {});
          for (const request of [...response.request().redirectChain(), response.request()]) remoteImages.set(request.url(), image);
        });
        await page.setRequestInterception(true);
        page.on('request', request => {
          const url = request.url();
          if (/^https?:/.test(url) && new URL(url).origin !== origin && request.resourceType() !== 'image') request.abort();
          else request.continue();
        });
        for (const version of versions) {
          const ids = new Set();
          const collect = items => items.forEach(item => {
            if (item.type === 'doc') ids.add(item.id);
            if (item.type === 'category') {
              if (item.link?.type === 'doc') ids.add(item.link.id);
              collect(item.items);
            }
          });
          for (const name of options.sidebarNames.length ? options.sidebarNames : Object.keys(version.sidebars)) collect(version.sidebars[name] || []);
          for (const id of ids) {
            const doc = version.docs.find(doc => doc.id === id);
            if (!doc) throw new Error(`PDF document not found: ${id}`);
            console.log(`[portfolio-pdf] Preparing ${id}`);
            await page.goto(origin + doc.permalink, {waitUntil: 'networkidle0', timeout: options.puppeteerTimeout});
            await page.waitForFunction(() => [...document.querySelectorAll('.diagram-popout__canvas')].every(el => el.querySelector('svg, img')), {timeout: options.puppeteerTimeout});
            await page.evaluate(async () => {
              document.querySelectorAll('details').forEach(el => { el.open = true; });
              document.querySelectorAll('article img').forEach(img => { img.loading = 'eager'; });
              await Promise.all([...document.querySelectorAll('article img')].map(async img => { try { await img.decode(); } catch { throw new Error(`PDF image failed: ${img.src}`); } }));
              await document.fonts.ready;
            });
            const embeddedImages = Object.fromEntries(await Promise.all([...remoteImages].map(async ([url, image]) => [url, await image])));
            const html = await page.evaluate(({id, permalink, siteUrl, embeddedImages}) => {
              const article = document.querySelector('article');
              if (!article) throw new Error('Missing documentation article');
              // Native <details> fragmentation can overlap following text in print.
              // Replace it only in the PDF snapshot with ordinary flowing sections.
              for (const details of [...article.querySelectorAll('details')].reverse()) {
                const section = document.createElement('section');
                section.className = 'pdf-details';
                const summary = details.querySelector(':scope > summary');
                if (summary) {
                  const label = document.createElement('div');
                  label.className = 'pdf-summary';
                  label.innerHTML = summary.innerHTML;
                  section.append(label);
                  summary.remove();
                }
                for (const child of [...details.childNodes]) {
                  if (child.nodeType === Node.ELEMENT_NODE) child.removeAttribute('style');
                  section.append(child);
                }
                details.replaceWith(section);
              }
              // Give every document its own anchor namespace in the combined PDF.
              const ids = new Map([...article.querySelectorAll('[id]')].map(el => [el.id, `pdf-${id}-${el.id}`]));
              for (const el of article.querySelectorAll('*')) {
                if (el.id) el.id = ids.get(el.id);
                for (const attr of [...el.attributes]) {
                  let value = attr.value;
                  if ((attr.name === 'href' || attr.name === 'xlink:href') && value.startsWith('#') && ids.has(value.slice(1))) value = '#' + ids.get(value.slice(1));
                  value = value.replace(/url\(["']?#([^)'"\s]+)["']?\)/g, (match, ref) => ids.has(ref) ? `url(#${ids.get(ref)})` : match);
                  if (value !== attr.value) el.setAttribute(attr.name, value);
                }
              }
              for (const style of article.querySelectorAll('svg style')) {
                style.textContent = style.textContent.replace(/#([\w-]+)/g, (match, ref) => ids.has(ref) ? '#' + ids.get(ref) : match);
              }
              article.querySelectorAll('img').forEach(img => {
                // A new local server will serve the temporary snapshot.
                const url = new URL(img.currentSrc || img.src);
                img.src = url.origin === location.origin ? url.pathname : (embeddedImages[url.href] || url.href);
                img.removeAttribute('srcset');
              });
              const source = document.createElement('p');
              source.className = 'pdf-source';
              const link = document.createElement('a');
              link.href = siteUrl + permalink;
              link.textContent = link.href;
              source.append('웹 문서: ', link);
              article.querySelector('h1').after(source);
              return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
            }, {id, permalink: doc.permalink, siteUrl: context.siteConfig.url, embeddedImages});
            const route = decodeURIComponent(doc.permalink.slice(context.baseUrl.length));
            // Papersaurus expects directory-style HTML routes.
            const target = path.join(snapshot, route, 'index.html');
            await fs.mkdir(path.dirname(target), {recursive: true});
            await fs.writeFile(target, html);
          }
        }
        await browser.close();
        browser = null;
        await new Promise(resolve => server.close(resolve));
        server = null;
        const {includeDocs, ...pdfOptions} = options;
        const plugin = upstream.default({...context, outDir: snapshot}, pdfOptions);
        await plugin.postBuild(pdfProps);
        await fs.cp(path.join(snapshot, 'pdfs'), path.join(context.outDir, 'pdfs'), {recursive: true});
        await fs.copyFile(path.join(snapshot, 'pdfs.json'), path.join(context.outDir, 'pdfs.json'));
        // The development server serves static/, not build/. Keep the last
        // successful full PDF available to npm start as well as npm serve.
        const staticPdfDir = path.join(context.siteDir, 'static', 'pdfs');
        await fs.mkdir(staticPdfDir, {recursive: true});
        await fs.copyFile(
          path.join(context.outDir, 'pdfs', 'pomodoro-portfolio.pdf'),
          path.join(staticPdfDir, 'pomodoro-portfolio.pdf'),
        );
      } finally {
        if (browser) await browser.close();
        if (server) await new Promise(resolve => server.close(resolve));
        await fs.rm(snapshot, {recursive: true, force: true});
      }
    },
  };
};
module.exports.validateOptions = ({options = {}, ...validation}) => {
  const {includeDocs, ...pdfOptions} = options;
  if (includeDocs !== undefined && (!Array.isArray(includeDocs) || !includeDocs.length ||
      includeDocs.some(id => typeof id !== 'string' || !id) || new Set(includeDocs).size !== includeDocs.length)) {
    throw new Error('includeDocs must be a non-empty list of unique document IDs');
  }
  return {...upstream.validateOptions({...validation, options: pdfOptions}), includeDocs};
};
