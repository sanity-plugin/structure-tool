import type { TemplateResolver } from 'sanity';

import type { ListItem } from '@/structure/types/listItem.types';

export type Templates = <
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  flatListItems: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[],
) => TemplateResolver;
