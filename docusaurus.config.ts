import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Pomodoro",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://pomodoro-doc.vercel.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Yonghwan Song", // Usually your GitHub org/user name.
  projectName: "docusaurus", //! Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    "docusaurus-plugin-zooming",
    [
      "./plugins/portfolio-pdf/index.cjs",
      {
        sidebarNames: ["tutorialSidebar"],
        includeDocs: ["introduction", "database", "problem-solving"],
        ignoreDocs: [],
        autoBuildPdfs: true,
        addDownloadButton: false,
        author: "송용환",
        productTitles: ["Pomodoro Portfolio"],
        puppeteerTimeout: 120000,
        stylesheets: ["/pdf-assets/print.css"],
        alwaysIncludeSiteStyles: true,
        scripts: ["/pdf-assets/ready.js"],
        ignoreCssSelectors: [".pdf-download", ".diagram-popout__hint"],
        margins: {top: "18mm", right: "15mm", bottom: "18mm", left: "15mm"},
        coverMargins: {top: "0", right: "0", bottom: "0", left: "0"},
        coverPageHeader: "<span></span>",
        coverPageFooter: "<span></span>",
        getPdfCoverPage: () => `<html lang="ko"><meta charset="utf-8"><title>Pomodoro Portfolio</title><body style="font-family:sans-serif;padding:55mm 20mm;color:#243b32"><div style="margin-bottom:38px"><p style="margin:0;font-size:22px;font-weight:700">송용환</p><p style="margin:5px 0 0;color:#6b7973;font-size:12px;letter-spacing:0.08em">YONGHWAN SONG</p></div><h1 style="font-size:38px">Pomodoro Portfolio</h1><p>프로젝트 소개 · 데이터베이스 · 문제 해결</p><p>https://pomodoro-doc.vercel.app</p><p>${new Date().toISOString().slice(0, 10)}</p></body></html>`,
        getPdfPageHeader: () => "<span></span>",
        getPdfPageFooter: () => `<div style="font-family:sans-serif;font-size:9px;width:100%;text-align:center">Page <span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
        footerParser: /Page \d+ \/ \d+/g,
        getPdfFileName: (_site, _options, _title, id, _titles, parents) =>
          parents.length === 0 ? "pomodoro-portfolio" : id,
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/", // route path for docs. And we set the root path of this site to the docs/intro. Thus... slug is appended to '/' right?
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },

        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    tableOfContents: {
      minHeadingLevel: 2,
      // maxHeadingLevel: 6,
      // maxHeadingLevel: 4, 뭐야 작동 안되는듯? // TODO:
      maxHeadingLevel: 3,
    },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    zooming: {
      selector: ".markdown img:not(.erd-preview):not(.diagram-popout img)",
      delay: 500,
      background: {
        light: "rgba(101,108,133,0.8)",
        dark: "rgba(9,10,17,0.8)",
      },
      options: {
        // See the docs of zooming for all available options: https://github.com/francoischalifour/medium-zoom#usage
      },
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: "Pomodoro",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          href: "https://pomodoro-git-main-yhs-projects-00a441cb.vercel.app",
          label: "Live Web App",
          position: "right",
        },
        {
          href: "https://github.com/Yonghwan-Song/pomodoro",
          label: "Source Code",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Yonghwan Song, All Rights Reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
};

export default config;
