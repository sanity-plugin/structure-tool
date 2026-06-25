import type { ConfigContext, CurrentUser } from 'sanity';

import type {
  StructureToolCallbackParams,
  StructureToolParams,
  Workspace,
} from '@/structure/types/common.types';

/**
 * Resolves context properties such as the active workspace name, user information, and context object into a unified state payload.
 *
 * @param context - The Sanity Studio configuration context.
 * @returns An object containing the current workspace, current user, and non-null context.
 */
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
