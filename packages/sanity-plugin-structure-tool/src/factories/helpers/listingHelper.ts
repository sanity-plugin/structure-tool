import type { RequireOneOrNone, SetRequired } from 'type-fest';

import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';

type ListingHelperParams<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = ListItemWithWorkspacesAndRoles<Workspaces, DefaultWorkspaces, Roles, DefaultRoles> &
  SetRequired<
    Pick<
      ListItemWithoutGenerics,
      'title' | 'schemaType' | 'icon' | 'apiVersion' | 'filter' | 'filterParams' | 'isPlural'
    >,
    'schemaType'
  > &
  RequireOneOrNone<Pick<ListItemWithoutGenerics, 'hideAddButton' | 'templates'>>;

type ListingHelperOutput<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = ListingHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export type ListingHelperType<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = (
  params: ListingHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
) => ListingHelperOutput<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export type ListingHelper = <
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  params: ListingHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
) => ListingHelperOutput<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export const listingHelper: ListingHelper = (params) => params;
