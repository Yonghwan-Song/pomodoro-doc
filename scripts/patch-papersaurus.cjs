const fs = require('node:fs');
const path = require('node:path');

// Compatibility fixes for the pinned upstream 1.0.1 release:
// - html-toc encodes Korean titles, while the sidebar uses Unicode.
// - Resolve page numbers using each document's unique source URL, not titles
//   that may reappear in another chapter or wrap over multiple lines.
const packageRoot = path.dirname(require.resolve('@axinom/docusaurus-plugin-papersaurus/package.json'));
const file = path.join(packageRoot, 'dist/generate.js');
let source = fs.readFileSync(file, 'utf8');
const replacements = [
  ['new Set(articleList.map((a) => a.pageTitle || a.label).filter(Boolean))', 'new Set(articleList.map((a) => decodeHtml(a.pageTitle || a.label || "")).filter(Boolean))'],
  ['sidebarTitles.has(info.text)', 'sidebarTitles.has(decodeHtml(info.text))'],
  ['sidebarTitles.has(tocLinkInfo.text)', 'sidebarTitles.has(decodeHtml(tocLinkInfo.text))'],
];
for (const [before, after] of replacements) {
  if (source.includes(after)) continue;
  if (!source.includes(before)) throw new Error(`Papersaurus patch no longer matches: ${before}`);
  source = source.replaceAll(before, after);
}
const start = source.indexOf('const getPageWithFixedToc = ');
const end = source.indexOf('const getURL = ', start);
if (start < 0 || end < 0) throw new Error('Papersaurus TOC function no longer matches');
const replacement = String.raw`const getPageWithFixedToc = (footerRegEx, tocList, pdfContent, htmlContent) => {
    const pages = pdfContent.split(footerRegEx);
    const normalize = text => text.replace(/\s/g, '');
    const $ = cheerio.load(htmlContent);
    for (const entry of tocList) {
        const title = normalize(decodeHtml(entry.text));
        const heading = $('h1').filter((_, el) => normalize($(el).text()) === title).first();
        const url = heading.next('.pdf-source').find('a').attr('href');
        if (!url) throw new Error('PDF source URL missing for ' + entry.text);
        const marker = normalize('웹 문서: ' + url);
        const index = pages.findIndex((page, i) => i > 0 && normalize(page).includes(marker));
        if (index < 0) throw new Error('PDF page number not found for ' + url);
        htmlContent = htmlContent.replace('<span class="pageNumber">_</span>', '<span class="pageNumber">' + (index + 1) + '</span>');
    }
    return htmlContent;
};
`;
source = source.slice(0, start) + replacement + source.slice(end);
fs.writeFileSync(file, source);
