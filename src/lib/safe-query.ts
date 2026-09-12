/**
 * Utility to execute async database / API queries with a strict timeout and fallback.
 * Prevents PostgREST / Supabase connection cold-starts from causing 504 Gateway Timeouts.
 */
export async function safeQuery<T>(
  promiseOrFn: PromiseLike<T> | Promise<T> | (() => Promise<T> | PromiseLike<T>),
  fallback: T,
  timeoutMs = 3500
): Promise<T> {
  const promise = Promise.resolve(
    typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn
  );

  const timeoutPromise = new Promise<T>((resolve) => {
    const timer = setTimeout(() => {
      resolve(fallback);
    }, timeoutMs);
    if (timer && typeof timer === 'object' && 'unref' in timer) {
      (timer as any).unref();
    }
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    return (result !== undefined && result !== null ? result : fallback) as T;
  } catch (err) {
    console.warn('[SafeQuery Exception Handled]:', err);
    return fallback;
  }
}
