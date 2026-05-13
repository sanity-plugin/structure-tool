export type SimpleMerge<Types extends unknown[]> = Types extends [infer First, ...infer Rest]
  ? First & SimpleMerge<Rest>
  : unknown;
