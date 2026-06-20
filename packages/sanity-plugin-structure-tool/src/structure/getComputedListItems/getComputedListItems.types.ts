import type { StructureBuilder } from 'sanity/structure';

import type { StructureListItemsParams } from '@/structure/structure/structure.types';
import type { StructureToolParams, ValidSanityContext } from '@/structure/types/common.types';
import type {
  DefaultListItem,
  ListItem,
  ListItemExtendedItems,
} from '@/structure/types/listItem.types';
import type { ListItemCore } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

interface GetComputedListItemsParams<T extends StructureToolParams> {
  S: StructureBuilder;
  listItem: StructureListItemsParams<T>['listItems'][number];
  context: ValidSanityContext;
}

export type GetComputedListItems = <T extends StructureToolParams>(
  params: GetComputedListItemsParams<T>,
) => SimpleMerge<
  [
    Omit<ListItemCore, DefaultListItem>,
    Omit<ListItemExtendedItems<T>, 'id' | 'children'>,
    {
      children?: ListItem<T>[];
    },
  ]
>;
