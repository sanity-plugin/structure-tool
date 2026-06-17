import { dividerHelper, DividerHelperType } from '@/factories/helpers/dividerHelper';
import { FiltersHelperType, filtersHelper } from '@/factories/helpers/filtersHelper';
import { listingHelper, ListingHelperType } from '@/factories/helpers/listingHelper';
import { singletonHelper, SingletonHelperType } from '@/factories/helpers/singletonHelper';

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
