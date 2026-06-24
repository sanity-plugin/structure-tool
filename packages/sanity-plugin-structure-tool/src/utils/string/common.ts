/**
 * Escapes special regex characters in a string so it can be safely used in regex creation.
 *
 * @param str - The raw string to escape.
 * @returns The escaped regex string.
 */
export const escapeRegex = (str: string): string =>
  str.replaceAll(/[/\-\\^$*+?.()|[\]{}]/g, String.raw`\$&`);

/**
 * Sanitizes a string to make it safe for use in URLs or IDs.
 * Converts to lowercase, trims whitespace, removes special characters, and replaces spaces with hyphens.
 *
 * @param str - The raw string to sanitize.
 * @returns The sanitized URL-safe string.
 */
export const sanitizeUrl = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, '') // remove unsupported chars
    .replaceAll(/\s+/g, '-') // spaces -> -
    .replaceAll(/-+/g, '-'); // remove duplicate -
