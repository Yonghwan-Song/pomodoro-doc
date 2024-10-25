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

  plugins: ["docusaurus-plugin-zooming"],

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
      maxHeadingLevel: 5,
    },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    zooming: {
      selector: ".markdown img",
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
          href: "https://www.pomodoroaid.online",
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
};

export default config;
