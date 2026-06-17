import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';

type DividerHelperParams<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = ListItemWithWorkspacesAndRoles<Workspaces, DefaultWorkspaces, Roles, DefaultRoles> &
  Pick<ListItemWithoutGenerics, 'title'>;

type DividerHelperOutput<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = DividerHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles> & {
  isDivider: true;
};

export type DividerHelperType<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = (
  params: DividerHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
) => DividerHelperOutput<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export type DividerHelper = <
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  params: DividerHelperParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
) => DividerHelperOutput<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export const dividerHelper: DividerHelper = (params) => ({
  ...params,
  isDivider: true,
});
