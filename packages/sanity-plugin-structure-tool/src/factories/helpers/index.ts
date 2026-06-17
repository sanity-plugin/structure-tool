import { dividerHelper } from '@/factories/helpers/dividerHelper';
import { filtersHelper } from '@/factories/helpers/filtersHelper';
import { listingHelper } from '@/factories/helpers/listingHelper';
import { singletonHelper } from '@/factories/helpers/singletonHelper';

import type { DividerHelper } from '@/factories/helpers/dividerHelper';
import type { FiltersHelper } from '@/factories/helpers/filtersHelper';
import type { ListingHelper } from '@/factories/helpers/listingHelper';
import type { SingletonHelper } from '@/factories/helpers/singletonHelper';
import type { StructureToolParams } from '@/structure/types/common.types';

export interface Helpers<T extends StructureToolParams> {
  listing: ListingHelper<T>;
  filters: FiltersHelper<T>;
  singleton: SingletonHelper<T>;
  divider: DividerHelper<T>;
}

export const helpers = {
  listing: listingHelper,
  filters: filtersHelper,
  singleton: singletonHelper,
  divider: dividerHelper,
} as const;
