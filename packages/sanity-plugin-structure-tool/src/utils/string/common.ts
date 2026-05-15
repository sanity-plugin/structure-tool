export const escapeRegex = (str: string): string =>
  str.replaceAll(/[/\-\\^$*+?.()|[\]{}]/g, String.raw`\$&`);

export const sanitizeUrl = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, '') // remove unsupported chars
    .replaceAll(/\s+/g, '-') // spaces -> -
    .replaceAll(/-+/g, '-'); // remove duplicate -
