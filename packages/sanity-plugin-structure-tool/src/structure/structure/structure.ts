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

    if (!currentUser) return S.list().title('CurrentUser not found').items([]);

    const validContext = { ...context, currentUser };

    const displayTitle =
      typeof title === 'function'
        ? title({ workspace, currentUser, context: validContext })
        : title;

    const displayEmptyListTitle =
      typeof emptyListTitle === 'function'
        ? emptyListTitle({ workspace, currentUser, context: validContext })
        : emptyListTitle;

    if (!workspace) return S.list().title(displayTitle).items([]);

    const workspaceListItems = getWorkspaceListItems<T>(S, workspace, validContext, restParams);

    if (!workspaceListItems || workspaceListItems.length === 0) {
      return S.list().title(displayEmptyListTitle ?? `${displayTitle} Not Configured`);
    }

    return S.list()
      .title(displayTitle)
      .items(
        workspaceListItems
          .map((listItem) => renderListItem<T>(S, validContext, listItem))
          .filter((item) => item !== null),
      );
  };
