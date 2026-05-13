import type { TemplateResolver } from 'sanity';

import type { ListItem } from '@/structure/types/listItem.types';

export type Templates = <
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  flatListItems: ListItem<Roles, DefaultRoles>[],
) => TemplateResolver;
