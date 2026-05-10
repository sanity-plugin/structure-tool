import { definePlugin } from 'sanity';
import { structureTool } from 'sanity/structure';

import structure from './structure';

import type { ContentTypes } from './structure/@types/contentTypes.types';

interface MyPluginConfig {
  contentTypes: ContentTypes[];
}

export const structureToolPlugin = definePlugin<MyPluginConfig>((config) => {
  console.log('hello from sanity-plugin-structure-tool');

  const { contentTypes } = config;

  return {
    name: 'sanity-plugin-structure-tool',
    plugins: [
      structureTool({
        structure: structure(contentTypes),
      }),
    ],
  };
});
