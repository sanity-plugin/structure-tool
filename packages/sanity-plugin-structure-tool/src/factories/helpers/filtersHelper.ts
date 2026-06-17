import type { SetRequired } from 'type-fest';

import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';

type FiltersHelperParams<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = ListItemWithWorkspacesAndRoles<Workspaces, DefaultWorkspaces, Roles, DefaultRoles> &
  SetRequired<
    Pick<ListItemWithoutGenerics, 'title' | 'icon' | 'apiVersion' | 'filter' | 'filterParams'>,
    'title' | 'filter'
  >;

type FiltersHelperOutput<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = FiltersHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export type FiltersHelperType<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = (
  params: FiltersHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
) => FiltersHelperOutput<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export type FiltersHelper = <
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  params: FiltersHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
) => FiltersHelperOutput<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export const filtersHelper: FiltersHelper = (params) => params;
