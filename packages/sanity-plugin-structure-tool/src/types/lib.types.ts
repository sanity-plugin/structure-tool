import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export type SimpleMerge<Types extends unknown[]> = Types extends [infer First, ...infer Rest]
  ? First & SimpleMerge<Rest>
  : unknown;

// @see: https://github.com/sanity-io/icons/blob/main/src/types.ts#L6
export type IconComponent = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
>;
