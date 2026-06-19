import type {
  StructureCommonParams,
  StructureListItemsParams,
} from '@/structure/structure/structure.types';
import type { StructureToolParams } from '@/structure/types/common.types';

export interface GetWorkspaceListItem<
  T extends StructureToolParams,
> extends StructureCommonParams<T> {
  id: string;
  options: StructureListItemsParams<T>;
}

export interface GetWorkspaceItem<T extends StructureToolParams> {
  id: string;
  listItems: StructureListItemsParams<T>['listItems'];
}
