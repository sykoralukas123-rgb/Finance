import { useEffect, useState } from 'react'

interface AsyncState<T> {
  data: T | undefined
  error: Error | undefined
  loading: boolean
}

// Runs `fn` whenever `key` changes; a null key waits. Results of stale runs are ignored.
export function useAsync<T>(fn: () => Promise<T>, key: string | null): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T> & { key: string | null }>({
    data: undefined,
    error: undefined,
    loading: true,
    key: null,
  })

  useEffect(() => {
    if (key === null) return
    let active = true
    fn().then(
      (data) => active && setState({ data, error: undefined, loading: false, key }),
      (error: unknown) =>
        active &&
        setState({ data: undefined, error: error instanceof Error ? error : new Error(String(error)), loading: false, key }),
    )
    return () => {
      active = false
    }
    // fn is recreated each render; `key` captures every input it depends on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // While a new key is loading, report loading instead of the previous key's data.
  if (state.key !== key) return { data: undefined, error: undefined, loading: true }
  return state
}
