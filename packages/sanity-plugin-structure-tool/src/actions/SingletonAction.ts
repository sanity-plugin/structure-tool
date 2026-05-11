import { constants, sanityActions } from '@/constants';

import type { DocumentActionComponent, DocumentActionsResolver } from 'sanity';

type GetActionName = (action: DocumentActionComponent) => string;

const getActionName: GetActionName = (action) =>
  // Check for action to be both the type promised by Types while maintaining current function type check for historical purposes
  (typeof action === 'function' ? action.action : '') as string;

export const SingletonAction: DocumentActionsResolver = (prev, context) => {
  const { documentId } = context;

  if (documentId?.endsWith(constants.SINGLETON_KEY)) {
    return prev.filter((action) => {
      const actionName = getActionName(action);

      return !(
        [sanityActions.DELETE, sanityActions.DUPLICATE, sanityActions.UNPUBLISH] as string[]
      ).includes(actionName);
    });
  }

  return prev;
};
