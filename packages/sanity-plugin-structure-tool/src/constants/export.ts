import { constants as pkgConstants } from '@/constants/constants';

/**
 * Publicly exported structure tool constants.
 */
export const constants = {
  SINGLETON_KEY: pkgConstants.SINGLETON_KEY,
  URL_PATH_SEPARATOR: pkgConstants.URL_PATH_SEPARATOR,
  I18N_NAMESPACE: pkgConstants.I18N_NAMESPACE,
} as const;
