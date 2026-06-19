import type { TemplateResolver } from 'sanity';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

interface TemplatesParams<T extends StructureToolParams> {
  listItems: ListItem<T>[];
}

export type Templates = <T extends StructureToolParams>(
  params: TemplatesParams<T>,
) => TemplateResolver;
