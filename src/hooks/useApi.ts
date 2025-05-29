import { useState, useCallback } from 'react'
import { apiClient, ApiError } from '../utils/api'

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: ApiError) => void
}

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(
    async (
      method: 'get' | 'post' | 'put' | 'delete',
      url: string,
      data?: unknown,
      options?: UseApiOptions<T>
    ) => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiClient[method]<T>(url, data)
        setData(response.data)
        options?.onSuccess?.(response.data)
        return response.data
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError)
        options?.onError?.(apiError)
        throw apiError
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const get = useCallback(
    (url: string, options?: UseApiOptions<T>) => execute('get', url, undefined, options),
    [execute]
  )

  const post = useCallback(
    (url: string, data?: unknown, options?: UseApiOptions<T>) =>
      execute('post', url, data, options),
    [execute]
  )

  const put = useCallback(
    (url: string, data?: unknown, options?: UseApiOptions<T>) =>
      execute('put', url, data, options),
    [execute]
  )

  const del = useCallback(
    (url: string, options?: UseApiOptions<T>) => execute('delete', url, undefined, options),
    [execute]
  )

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    delete: del,
  }
} 