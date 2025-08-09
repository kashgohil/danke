interface Success<T> {
  result: T;
  error: null;
}

interface Failure {
  result: null;
  error: Error;
}

type TryCatchResult<T> = Success<T> | Failure;

export function tryCatchSync<T>(
  fn: (...args: TSAny) => T,
  ...args: TSAny
): TryCatchResult<T> {
  try {
    const result = fn(args);
    return { result, error: null };
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error(String(err ?? 'Unknown error'));
    return { result: null, error };
  }
}

export async function tryCatch<T>(
  promise: Promise<T>
): Promise<TryCatchResult<T>> {
  try {
    const result = await promise;
    return { result, error: null };
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error(String(err ?? 'Unknown error'));
    return { result: null, error };
  }
}
