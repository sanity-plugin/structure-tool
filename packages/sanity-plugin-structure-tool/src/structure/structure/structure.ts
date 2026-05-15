import { getWorkspaceListItems } from '@/helpers/getWorkspaceListItems';
import { renderListItem } from '@/structure/renderListItem/renderListItem';

import type { StructureResolver } from 'sanity/structure';

import type { StructureParams } from '@/structure/structure/structure.types';

export const structure =
  <
    Workspaces extends readonly string[] | undefined,
    DefaultWorkspaces extends readonly string[] | undefined,
    Roles extends readonly string[] | undefined,
    DefaultRoles extends readonly string[] | undefined,
  >(
    params: StructureParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
  ): StructureResolver =>
  (S, context) => {
    const { title, emptyListTitle, ...restParams } = params;
    const { currentUser, schema } = context;
    const { _original: original } = schema;

    const workspace = original?.name as Workspaces extends readonly string[]
      ? Workspaces[number]
      : string;

    const displayTitle = typeof title === 'function' ? title({ workspace, context }) : title;
    const displayEmptyListTitle =
      typeof emptyListTitle === 'function'
        ? emptyListTitle({ workspace, context })
        : emptyListTitle;

    if (!workspace || !currentUser) return S.list().title(displayTitle).items([]);

    const workspaceListItems = getWorkspaceListItems<
      Workspaces,
      DefaultWorkspaces,
      Roles,
      DefaultRoles
    >(S, workspace, currentUser, restParams);

    if (!workspaceListItems || workspaceListItems.length === 0) {
      return S.list().title(displayEmptyListTitle ?? `${displayTitle} Not Configured`);
    }

    return S.list()
      .title(displayTitle)
      .items(
        workspaceListItems
          .map((listItem) =>
            renderListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>(
              S,
              { ...context, currentUser },
              listItem,
            ),
          )
          .filter((item) => item !== null),
      );
  };
