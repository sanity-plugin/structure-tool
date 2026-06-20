import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';
import { getWorkspaceListItem } from '@/structure/getWorkspaceListItem/getWorkspaceListItem';
import { renderListItem } from '@/structure/renderListItem/renderListItem';

import type { StructureResolver } from 'sanity/structure';

import type { StructureParams } from '@/structure/structure/structure.types';
import type { StructureToolParams } from '@/structure/types/common.types';

export const structure =
  <T extends StructureToolParams>(params: StructureParams<T>): StructureResolver =>
  (S, context) => {
    const { title, emptyListTitle, ...restParams } = params;

    const contextValues = getContextValues<T>(context);
    const { workspace, context: validContext } = contextValues;

    const displayTitle = getValidListItem(title, contextValues);
    const displayEmptyListTitle = getValidListItem(emptyListTitle, contextValues);

    if (!workspace) return S.list().title(displayTitle).items([]);

    const workspaceListItems = getWorkspaceListItem<T>({
      S,
      workspace,
      context: validContext,
      options: restParams,
    });

    const listItemRenderer = S.list()
      .title(displayTitle)
      .items(
        workspaceListItems
          .map((listItem) => renderListItem<T>({ S, workspace, context: validContext, listItem }))
          .filter((item) => item !== null),
      );

    if (listItemRenderer.getItems()?.length === 0) {
      return S.list().title(displayEmptyListTitle ?? `${displayTitle} Not Configured`);
    }

    return listItemRenderer;
  };
