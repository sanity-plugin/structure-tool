import { dividerHelper } from '@/factories/helpers/dividerHelper';
import { filtersHelper } from '@/factories/helpers/filtersHelper';
import { listingHelper } from '@/factories/helpers/listingHelper';
import { singletonHelper } from '@/factories/helpers/singletonHelper';

import type { DividerHelperType } from '@/factories/helpers/dividerHelper';
import type { FiltersHelperType } from '@/factories/helpers/filtersHelper';
import type { ListingHelperType } from '@/factories/helpers/listingHelper';
import type { SingletonHelperType } from '@/factories/helpers/singletonHelper';

export interface Helpers<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  listing: ListingHelperType<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;
  filters: FiltersHelperType<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;
  singleton: SingletonHelperType<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;
  divider: DividerHelperType<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;
}

export const helpers = {
  listing: listingHelper,
  filters: filtersHelper,
  singleton: singletonHelper,
  divider: dividerHelper,
} as const;
