/**
 * Dictionary of supported Sanity Studio document action names.
 * These actions are typically evaluated for role and workspace permission filters.
 */
export const sanityActions = {
  DELETE: 'delete',
  DISCARD_CHANGES: 'discardChanges',
  DISCARD_VERSION: 'discardVersion',
  DUPLICATE: 'duplicate',
  RESTORE: 'restore',
  PUBLISH: 'publish',
  UNPUBLISH: 'unpublish',
  UNPUBLISH_VERSION: 'unpublishVersion',
  LINK_TO_CANVAS: 'linkToCanvas',
  EDIT_IN_CANVAS: 'editInCanvas',
  UNLINK_FROM_CANVAS: 'unlinkFromCanvas',
  SCHEDULE: 'schedule',
} as const;
