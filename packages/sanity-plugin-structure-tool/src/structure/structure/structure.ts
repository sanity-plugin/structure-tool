import { getWorkspaceListItems } from '@/helpers/getWorkspaceListItems';
import { renderListItem } from '@/structure/renderListItem/renderListItem';

import type { StructureResolver } from 'sanity/structure';

import type { StructureParams } from '@/structure/structure/structure.types';
import type { StructureToolParams, Workspace } from '@/structure/types/common.types';

export const structure =
  <T extends StructureToolParams>(params: StructureParams<T>): StructureResolver =>
  (S, context) => {
    const { title, emptyListTitle, ...restParams } = params;
    const { currentUser, schema } = context;
    const { _original: original } = schema;

    const workspace = original?.name as Workspace<T>;

    const displayTitle = typeof title === 'function' ? title({ workspace, context }) : title;
    const displayEmptyListTitle =
      typeof emptyListTitle === 'function'
        ? emptyListTitle({ workspace, context })
        : emptyListTitle;

    if (!workspace || !currentUser) return S.list().title(displayTitle).items([]);

    const workspaceListItems = getWorkspaceListItems<T>(S, workspace, currentUser, restParams);

    if (!workspaceListItems || workspaceListItems.length === 0) {
      return S.list().title(displayEmptyListTitle ?? `${displayTitle} Not Configured`);
    }

    return S.list()
      .title(displayTitle)
      .items(
        workspaceListItems
          .map((listItem) => renderListItem<T>(S, { ...context, currentUser }, listItem))
          .filter((item) => item !== null),
      );
  };
