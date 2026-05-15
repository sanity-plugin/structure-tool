import constants from '@/constants';
import { workspaceTypes } from '@/constants/common';

import type { WorkspaceOptions } from 'sanity';

export type Workspace = Omit<WorkspaceOptions, 'projectId' | 'dataset'>;

const baseWorkspaces = [
  {
    name: workspaceTypes.SANITY_STRUCTURE_TOOL,
    title: constants.APP_NAME,
  },
  {
    name: workspaceTypes.TESTING,
    title: 'Testing',
  },
] satisfies Omit<Workspace, 'basePath'>[];

const workspaces = baseWorkspaces.map((item) => ({
  ...item,
  basePath: `/${item.name}`,
})) satisfies Workspace[];

export default workspaces;
