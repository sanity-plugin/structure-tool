import type { ValueOf } from 'type-fest';

import type { workspaceTypes } from '@/constants';

export type WorkspaceType = ValueOf<typeof workspaceTypes>;
