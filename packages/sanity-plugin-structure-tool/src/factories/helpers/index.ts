import { childrenHelper } from '@/factories/helpers/childrenHelper';
import { componentHelper } from '@/factories/helpers/componentHelper';
import { dividerHelper } from '@/factories/helpers/dividerHelper';
import { filtersHelper } from '@/factories/helpers/filtersHelper';
import { listingHelper } from '@/factories/helpers/listingHelper';
import { rawHelper } from '@/factories/helpers/rawHelper';
import { singletonHelper } from '@/factories/helpers/singletonHelper';

import type { ChildrenHelper } from '@/factories/helpers/childrenHelper';
import type { ComponentHelper } from '@/factories/helpers/componentHelper';
import type { DividerHelper } from '@/factories/helpers/dividerHelper';
import type { FiltersHelper } from '@/factories/helpers/filtersHelper';
import type { ListingHelper } from '@/factories/helpers/listingHelper';
import type { RawHelper } from '@/factories/helpers/rawHelper';
import type { SingletonHelper } from '@/factories/helpers/singletonHelper';
import type { StructureToolParams } from '@/structure/types/common.types';

export interface Helpers<T extends StructureToolParams> {
  listing: ListingHelper<T>;
  filters: FiltersHelper<T>;
  singleton: SingletonHelper<T>;
  divider: DividerHelper<T>;
  raw: RawHelper<T>;
  component: ComponentHelper<T>;
  children: ChildrenHelper<T>;
}

export const helpers = {
  listing: listingHelper,
  filters: filtersHelper,
  singleton: singletonHelper,
  divider: dividerHelper,
  raw: rawHelper,
  component: componentHelper,
  children: childrenHelper,
} satisfies Helpers<StructureToolParams>;
