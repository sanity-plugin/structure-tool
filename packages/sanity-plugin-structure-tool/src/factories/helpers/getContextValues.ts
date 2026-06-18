import type { ConfigContext, CurrentUser } from 'sanity';

import type {
  StructureToolCallbackParams,
  StructureToolParams,
  Workspace,
} from '@/structure/types/common.types';

export const getContextValues = <T extends StructureToolParams>(
  context: ConfigContext,
): StructureToolCallbackParams<T> => {
  const { currentUser, schema } = context;
  const { _original: original } = schema;

  const workspace = original?.name as Workspace<T>;
  const validCurrentUser = currentUser as CurrentUser;

  const validContext = { ...context, currentUser: validCurrentUser };

  return {
    workspace,
    currentUser: validCurrentUser,
    context: validContext,
  };
};
