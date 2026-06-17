export interface StructureToolParams {
  Workspaces: readonly string[] | undefined;
  DefaultWorkspaces: readonly string[] | undefined;
  Roles: readonly string[] | undefined;
  DefaultRoles: readonly string[] | undefined;
}

export type Workspace<T extends Pick<StructureToolParams, 'Workspaces'>> =
  T['Workspaces'] extends readonly string[] ? T['Workspaces'][number] : string;
