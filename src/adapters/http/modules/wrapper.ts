export function wrapper<A, R = any>(fn: (params: A) => Promise<R>) {
  return async (params: A): Promise<R | void> => {
    try {
      return await fn(params)
    } catch (err) {
      // TODO:
      console.log(err)
    }
  }
}
