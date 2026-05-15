import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitepress';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import llmstxt from 'vitepress-plugin-llms';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const { version } = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

const githubUrl = 'https://github.com/sanity-plugin/structure-tool';
const npmUrl = 'https://www.npmjs.com/package/sanity-plugin-structure-tool';
const siteUrl = 'https://sanity-structure-tool.nishargshah.dev';

const title = 'Sanity Structure Tool';
const description = 'A JSON based powerful structure tool for Sanity Studio.';

export default defineConfig({
  title,
  description,
  cleanUrls: true,
  lastUpdated: true,
  rewrites: {},
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [groupIconVitePlugin(), llmstxt({ title, description, details: '' })],
  },
  sitemap: {
    hostname: siteUrl,
  },
  themeConfig: {
    logo: '/logo.png',
    nav: [
      {
        text: `v${version}`,
        items: [
          {
            text: 'Release Notes',
            link: `${githubUrl}/releases`,
          },
          {
            text: 'Changelog',
            link: `${githubUrl}/blob/master/CHANGELOG.md`,
          },
          {
            text: 'Contributing',
            link: '/contribute/guide',
          },
        ],
      },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          {
            text: 'Getting Started',
            link: '/guide/getting-started',
          },
          {
            text: 'Why',
            link: '/guide/why',
          },
        ],
      },
      {
        text: 'Config',
        collapsed: false,
        items: [
          {
            text: 'Installation',
            link: '/config/installation',
          },
          {
            text: 'Extended Config',
            link: '/config/extended-config',
            collapsed: true,
            items: [
              {
                text: 'Rules',
                link: '/config/extended-config/rules',
              },
              {
                text: 'Plugins',
                link: '/config/extended-config/plugins',
              },
              {
                text: 'Extensions',
                link: '/config/extended-config/extensions',
              },
              {
                text: 'Configs',
                link: '/config/extended-config/configs',
              },
              {
                text: 'Helpers',
                link: '/config/extended-config/helpers',
              },
            ],
          },
          {
            text: 'Legacy Config',
            link: '/config/legacy-config',
          },
          {
            text: 'Extended vs Legacy',
            link: '/config/extended-vs-legacy',
          },
          {
            text: 'Packages Used',
            link: '/config/packages-used',
          },
          {
            text: 'FAQ',
            link: '/config/faq',
          },
        ],
      },
      {
        text: 'CLI',
        collapsed: false,
        items: [
          {
            text: 'Guide',
            link: '/cli/guide',
          },
          {
            text: 'Options',
            link: '/cli/options',
          },
        ],
      },
      {
        text: 'Customization',
        collapsed: false,
        items: [
          {
            text: 'Strict Rules',
            link: '/customization/strict-rules',
          },
        ],
      },
      {
        text: 'Migration',
        items: [
          {
            text: 'Upgrade to v3',
            link: '/migration/upgrade-to-v3',
          },
          {
            text: 'Upgrade to Extended',
            link: '/migration/upgrade-to-extended',
          },
        ],
      },
      {
        text: 'Contribute',
        items: [
          {
            text: 'Contributing',
            link: '/contribute/guide',
          },
        ],
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: githubUrl,
      },
      {
        icon: 'npm',
        link: npmUrl,
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-PRESENT <br/> Made with ❤️ by Nisharg Shah',
    },
    editLink: {
      pattern: `${githubUrl}/edit/master/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    lastUpdated: {
      text: 'Last Updated on',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
        hour12: true,
      },
    },
    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'author', content: `${title} Team` }],
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
    ],
    [
      'meta',
      {
        name: 'description',
        content: description,
      },
    ],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'sanity, sanity plugin, sanity plugin structure tool, sanity plugin structure builder, structure tool, structure builder, sanity structure tool, sanity structure builder',
      },
    ],
    // OG
    ['meta', { property: 'og:title', content: title }],
    [
      'meta',
      {
        property: 'og:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: `${siteUrl}/og-logo.png`,
      },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: siteUrl }],
    ['meta', { property: 'og:site_name', content: title }],
    // TWITTER
    ['meta', { name: 'twitter:title', content: title }],
    [
      'meta',
      {
        name: 'twitter:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: `${siteUrl}/og-logo.png`,
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:creator', content: '@iamnisharg' }],
  ],
});
