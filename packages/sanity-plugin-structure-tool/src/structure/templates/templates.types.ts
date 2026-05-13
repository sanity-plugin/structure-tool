import type { TemplateResolver } from 'sanity';

import type { ListItem } from '@/structure/types/listItem.types';

export type Templates = <Roles extends string[]>(
  flatListItems: ListItem<Roles>[],
) => TemplateResolver;
