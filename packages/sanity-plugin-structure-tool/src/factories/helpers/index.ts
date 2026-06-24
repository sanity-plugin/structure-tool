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

/**
 * Set of configuration helper functions passed to list items definitions callbacks.
 * Offers declarative APIs for structural items like lists, filters, dividers, component views, singletons, etc.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface Helpers<T extends StructureToolParams> {
  /**
   * Helper to define a standard Sanity list item listing document type.
   */
  listing: ListingHelper<T>;
  /**
   * Helper to define a generic GROQ-filtered document list item.
   */
  filters: FiltersHelper<T>;
  /**
   * Helper to define a singleton document list item.
   */
  singleton: SingletonHelper<T>;
  /**
   * Helper to define a visual divider list item.
   */
  divider: DividerHelper<T>;
  /**
   * Helper to define an imperatively rendered list item using the native Sanity Structure Builder.
   */
  raw: RawHelper<T>;
  /**
   * Helper to define a list item that renders a custom React component.
   */
  component: ComponentHelper<T>;
  /**
   * Helper to define a list item that has child items.
   */
  children: ChildrenHelper<T>;
}

/**
 * Concrete implementation map of the helper functions passed to dynamic list item callbacks.
 * Maps individual helper implementations to their semantic fields.
 */
export const helpers = {
  listing: listingHelper,
  filters: filtersHelper,
  singleton: singletonHelper,
  divider: dividerHelper,
  raw: rawHelper,
  component: componentHelper,
  children: childrenHelper,
} satisfies Helpers<StructureToolParams>;
