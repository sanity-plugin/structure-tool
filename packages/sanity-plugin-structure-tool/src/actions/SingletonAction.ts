import { constants, sanityActions } from '@/constants';

import type { DocumentActionComponent, DocumentActionsResolver } from 'sanity';

/**
 * Helper callback type to retrieve the name of a document action.
 */
type GetActionName = (action: DocumentActionComponent) => string;

/**
 * Resolves the string identifier name of a Sanity Studio document action component.
 * Handles the historical function action properties.
 *
 * @param action - The document action component.
 * @returns The resolved action name string.
 */
const getActionName: GetActionName = (action) =>
  // Check for action to be both the type promised by Types while maintaining current function type check for historical purposes
  (typeof action === 'function' ? action.action : '') as string;

/**
 * A custom Sanity Studio document actions resolver that disables delete, duplicate, and unpublish operations for singleton documents.
 * Singleton documents are identified by having their document ID end with the singleton key suffix.
 *
 * @param prev - The array of default document actions.
 * @param context - The document action context (containing schema, document ID, etc.).
 * @returns The filtered array of document actions permitted for this document.
 */
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
