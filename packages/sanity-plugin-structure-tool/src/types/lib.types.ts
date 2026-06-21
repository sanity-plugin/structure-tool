import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Recursively intersects a tuple of types into a single merged type.
 * Useful for combining multiple configuration schemas or mixins.
 *
 * @template Types - An array/tuple of types to intersect.
 */
export type SimpleMerge<Types extends unknown[]> = Types extends [infer First, ...infer Rest]
  ? First & SimpleMerge<Rest>
  : unknown;

/**
 * Represents a standard React SVG component type compatible with Sanity Studio icons.
 * Commonly returned by `@sanity/icons` packages.
 *
 * @see {@link https://github.com/sanity-io/icons/blob/main/src/types.ts#L6}
 */
export type IconComponent = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
>;
