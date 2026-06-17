import { singletonHelper, SingletonHelperType } from '@/factories/helpers/singletonHelper';

export interface Helpers<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  singleton: SingletonHelperType<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;
}

export const helpers = {
  singleton: singletonHelper,
} as const;
