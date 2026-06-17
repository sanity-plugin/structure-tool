import type { TemplateResolver } from 'sanity';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

export type Templates = <T extends StructureToolParams>(
  flatListItems: ListItem<T>[],
) => TemplateResolver;
