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
            link: '/introduction/getting-started',
          },
          {
            text: 'Why',
            link: '/introduction/why',
          },
          {
            text: 'Upcoming Features',
            link: '/introduction/upcoming-features',
          },
        ],
      },
      {
        text: 'Guide',
        collapsed: false,
        items: [
          {
            text: 'Setup',
            link: '/guide/setup',
            collapsed: true,
            items: [
              {
                text: 'Configuration',
                link: '/guide/setup/configuration',
              },
              {
                text: 'Define List Items',
                link: '/guide/setup/define-list-items',
              },
            ],
          },
          {
            text: 'List Items',
            link: '/guide/list-items',
          },
          {
            text: 'Helpers',
            link: '/guide/helpers',
          },
          {
            text: 'Comparison',
            link: '/guide/comparison',
          },
          {
            text: 'FAQ',
            link: '/guide/faq',
          },
        ],
      },
      {
        text: 'Examples',
        items: [
          {
            text: 'Usage',
            link: '/examples/usage',
          },
          {
            text: 'List Items',
            collapsed: true,
            items: [
              {
                text: 'id',
                link: '/examples/id',
              },
              {
                text: 'title',
                link: '/examples/title',
              },
              {
                text: 'schemaType',
                link: '/examples/schema-type',
              },
              {
                text: 'icon',
                link: '/examples/icon',
              },
              {
                text: 'showIcons',
                link: '/examples/show-icons',
              },
              {
                text: 'singleton',
                link: '/examples/singleton',
              },
              {
                text: 'component',
                link: '/examples/component',
              },
              {
                text: 'componentOptions',
                link: '/examples/component-options',
              },
              {
                text: 'children',
                link: '/examples/children',
              },
              {
                text: 'apiVersion',
                link: '/examples/api-version',
              },
              {
                text: 'filter + filterParams',
                link: '/examples/filter',
              },
              {
                text: 'defaultOrdering',
                link: '/examples/default-ordering',
              },
              {
                text: 'defaultLayout',
                link: '/examples/default-layout',
              },
              {
                text: 'menuItemGroups',
                link: '/examples/menu-item-groups',
              },
              {
                text: 'menuItems',
                link: '/examples/menu-items',
              },
              {
                text: 'workspaces',
                link: '/examples/workspaces',
              },
              {
                text: 'roles',
                link: '/examples/roles',
              },
              {
                text: 'hideAddButton',
                link: '/examples/hide-add-button',
              },
              {
                text: 'templates',
                link: '/examples/templates',
              },
              {
                text: 'raw',
                link: '/examples/raw',
              },
              {
                text: 'isDivider',
                link: '/examples/is-divider',
              },
              {
                text: 'isPlural',
                link: '/examples/is-plural',
              },
            ],
          },
        ],
      },
      {
        text: 'Customization',
        items: [
          {
            text: 'Constants',
            link: '/customization/constants',
          },
          {
            text: 'Singleton Action',
            link: '/customization/singleton-action',
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
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.png',
        type: 'image/png',
      },
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: '#ffffff',
      },
    ],
    [
      'meta',
      {
        name: 'author',
        content: `${title} Team`,
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
      },
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
    [
      'meta',
      {
        property: 'og:title',
        content: title,
      },
    ],
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
    [
      'meta',
      {
        property: 'og:type',
        content: 'website',
      },
    ],
    [
      'meta',
      {
        property: 'og:url',
        content: siteUrl,
      },
    ],
    [
      'meta',
      {
        property: 'og:site_name',
        content: title,
      },
    ],
    // TWITTER
    [
      'meta',
      {
        name: 'twitter:title',
        content: title,
      },
    ],
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
    [
      'meta',
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:creator',
        content: '@iamnisharg',
      },
    ],
  ],
});
