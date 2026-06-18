const isCallback = <P, V>(value: V | ((params: P) => V)): value is (params: P) => V =>
  typeof value === 'function';

export const getValidListItem = <V, P>(value: V | ((params: P) => V), params: P): V => {
  if (isCallback(value)) return value(params);

  return value;
};
