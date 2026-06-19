import { getContextValues } from '@/helpers/getContextValues';
import { getWorkspaceListItem } from '@/structure/getWorkspaceListItem/getWorkspaceListItem';
import { renderListItem } from '@/structure/renderListItem/renderListItem';

import type { StructureResolver } from 'sanity/structure';

import type { StructureParams } from '@/structure/structure/structure.types';
import type { StructureToolParams } from '@/structure/types/common.types';

export const structure =
  <T extends StructureToolParams>(params: StructureParams<T>): StructureResolver =>
  (S, context) => {
    const { title, emptyListTitle, ...restParams } = params;
    const { workspace, currentUser, context: validContext } = getContextValues<T>(context);

    const displayTitle =
      typeof title === 'function'
        ? title({ workspace, currentUser, context: validContext })
        : title;

    const displayEmptyListTitle =
      typeof emptyListTitle === 'function'
        ? emptyListTitle({ workspace, currentUser, context: validContext })
        : emptyListTitle;

    if (!workspace) return S.list().title(displayTitle).items([]);

    const workspaceListItems = getWorkspaceListItem<T>({
      S,
      workspace,
      context: validContext,
      id: '1',
      options: restParams,
    });

    if (!workspaceListItems || workspaceListItems.length === 0) {
      return S.list().title(displayEmptyListTitle ?? `${displayTitle} Not Configured`);
    }

    return S.list()
      .title(displayTitle)
      .items(
        workspaceListItems
          .map((listItem) => renderListItem<T>({ S, workspace, context: validContext, listItem }))
          .filter((item) => item !== null),
      );
  };
