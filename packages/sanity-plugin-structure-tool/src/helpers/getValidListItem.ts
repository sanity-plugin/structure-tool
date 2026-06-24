/**
 * Type guard helper checking if a value is a callback function.
 */
const isCallback = <P, V>(value: V | ((params: P) => V)): value is (params: P) => V =>
  typeof value === 'function';

/**
 * Resolves a config value that can either be a raw value or a context callback function.
 * If it is a callback, calls the function with the provided params and returns the result. Otherwise, returns the raw value.
 *
 * @param value - The value to resolve (can be a raw value or a function).
 * @param params - The context parameters to pass to the function if it is a callback.
 * @returns The resolved raw value.
 */
export const getValidListItem = <V, P>(value: V | ((params: P) => V), params: P): V => {
  if (isCallback(value)) return value(params);

  return value;
};
