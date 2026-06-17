import { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import { ListItemWithoutGenerics } from '@/types';

type SingletonHelperParams<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = Pick<ListItemWithoutGenerics, 'title' | 'icon'> &
  ListItemWithWorkspacesAndRoles<Workspaces, DefaultWorkspaces, Roles, DefaultRoles> & {
    schemaType: NonNullable<ListItemWithoutGenerics['schemaType']>;
  };

type SingletonHelperOutput<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SingletonHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles> & {
  singleton: true;
};

export type SingletonHelperType<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = (
  params: SingletonHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
) => SingletonHelperOutput<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export type SingletonHelper = <
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  params: SingletonHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
) => SingletonHelperOutput<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export const singletonHelper: SingletonHelper = (params) => {
  return {
    ...params,
    singleton: true,
  };
};
