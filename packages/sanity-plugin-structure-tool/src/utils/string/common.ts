export const escapeRegex = (str: string): string =>
  str.replaceAll(/[/\-\\^$*+?.()|[\]{}]/g, String.raw`\$&`);
