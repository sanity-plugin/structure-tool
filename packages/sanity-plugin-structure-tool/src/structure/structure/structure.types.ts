import type { StructureBuilder } from 'sanity/structure';

import type {
  StructureToolCoreParams,
  StructureToolRoleParams,
  StructureToolWorkspaceParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type {
  StructureToolParams,
  ValidSanityContext,
  Workspace,
} from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { SimpleMerge } from '@/types/lib.types';

export type StructureListItemsParams<T extends StructureToolParams> = SimpleMerge<
  [
    StructureToolWorkspaceParams<T>,
    StructureToolRoleParams<T>,
    {
      listItems: SimpleMerge<[ListItem<T>, ListItemWithWorkspacesAndRoles<T>]>[];
    },
  ]
>;

export type StructureParams<T extends StructureToolParams> = SimpleMerge<
  [StructureToolCoreParams<T>, StructureListItemsParams<T>]
>;

export interface StructureCommonParams<T extends StructureToolParams> {
  S: StructureBuilder;
  workspace: Workspace<T>;
  context: ValidSanityContext;
}
