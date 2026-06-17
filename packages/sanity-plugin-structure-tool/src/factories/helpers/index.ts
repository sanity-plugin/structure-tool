import { dividerHelper } from '@/factories/helpers/dividerHelper';
import { filtersHelper } from '@/factories/helpers/filtersHelper';
import { listingHelper } from '@/factories/helpers/listingHelper';
import { singletonHelper } from '@/factories/helpers/singletonHelper';

import type { DividerHelperType } from '@/factories/helpers/dividerHelper';
import type { FiltersHelperType } from '@/factories/helpers/filtersHelper';
import type { ListingHelperType } from '@/factories/helpers/listingHelper';
import type { SingletonHelperType } from '@/factories/helpers/singletonHelper';
import type { StructureToolParams } from '@/structure/types/common.types';

export interface Helpers<T extends StructureToolParams> {
  listing: ListingHelperType<T>;
  filters: FiltersHelperType<T>;
  singleton: SingletonHelperType<T>;
  divider: DividerHelperType<T>;
}

export const helpers = {
  listing: listingHelper,
  filters: filtersHelper,
  singleton: singletonHelper,
  divider: dividerHelper,
} as const;
