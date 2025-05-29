interface CacheItem<T> {
  data: T
  timestamp: number
  expiresIn: number
}

class Cache {
  private static instance: Cache
  private cache: Map<string, CacheItem<any>>
  private readonly DEFAULT_EXPIRES_IN = 5 * 60 * 1000 // 5 минут

  private constructor() {
    this.cache = new Map()
  }

  static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }
    return Cache.instance
  }

  set<T>(key: string, data: T, expiresIn: number = this.DEFAULT_EXPIRES_IN): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn,
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    const isExpired = Date.now() - item.timestamp > item.expiresIn
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Очистка устаревших данных
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.expiresIn) {
        this.cache.delete(key)
      }
    }
  }
}

export const cache = Cache.getInstance()

// Хук для работы с кэшированными данными
export const useCache = <T>(
  key: string,
  fetchData: () => Promise<T>,
  expiresIn?: number
): [T | null, boolean, () => Promise<void>] => {
  const [data, setData] = useState<T | null>(cache.get<T>(key))
  const [loading, setLoading] = useState(!data)

  const refresh = async () => {
    setLoading(true)
    try {
      const newData = await fetchData()
      cache.set(key, newData, expiresIn)
      setData(newData)
    } catch (error) {
      console.error('Cache refresh error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!data) {
      refresh()
    }
  }, [key])

  return [data, loading, refresh]
} 