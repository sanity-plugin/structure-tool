import type { ComponentType, ReactNode } from 'react';
import type { CurrentUser } from 'sanity';
import type { ListBuilder, StructureBuilder, StructureResolverContext } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { IconComponent, SimpleMerge } from '@/types/lib.types';

interface ListItemFilterCallbackParams {
  currentUser: CurrentUser;
}

type ListItemFilter = string | ((params: ListItemFilterCallbackParams) => string);

type ListItemFilterParams =
  | Record<string, unknown>
  | ((params: ListItemFilterCallbackParams) => Record<string, unknown>);

export type ListItemRaw = (
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
) => Parameters<ListBuilder['items']>[0][number] | null;

interface ListItemRolesParams<DefaultRoles extends readonly string[]> {
  defaultRoles: DefaultRoles;
}

export type ListItemRoles<
  Roles extends readonly string[],
  DefaultRoles extends readonly string[],
> = Roles[number][] | ((params: ListItemRolesParams<DefaultRoles>) => Roles[number][]);

export interface ListItemCore {
  title?: string;
  schemaType?: string;
  icon?: IconComponent | ComponentType | ReactNode;
  raw?: ListItemRaw;
  singleton?: boolean;
  filter?: ListItemFilter;
  filterParams?: ListItemFilterParams;
  hideAddButton?: boolean;
  isDivider?: boolean;
  isPlural?: boolean;
  templates?: Record<string, unknown>;
}

export type ListItemWithoutChildren<
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    ListItemCore,
    Roles extends readonly string[]
      ? DefaultRoles extends readonly string[]
        ? {
            roles?: ListItemRoles<Roles, DefaultRoles>;
          }
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {}
      : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        {},
    Workspaces extends readonly string[]
      ? {
          workspaces?: Workspaces;
        }
      : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        {},
  ]
>;

export type ListItem<
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    ListItemWithoutChildren<Workspaces, Roles, DefaultRoles>,
    {
      children?: ListItem<Workspaces, Roles, DefaultRoles>[];
    },
  ]
>;

export type ListItemExtended<
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    ListItemWithoutChildren<Workspaces, Roles, DefaultRoles>,
    {
      id: string;
      children: ListItemExtended<Workspaces, Roles, DefaultRoles>[];
      displayTitle: string;
    },
  ]
>;
