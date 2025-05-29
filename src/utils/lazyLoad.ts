import { lazy, ComponentType } from 'react'
import { CircularProgress, Box } from '@mui/material'

interface LazyLoadOptions {
  fallback?: React.ReactNode
}

const defaultFallback = (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
    }}
  >
    <CircularProgress />
  </Box>
)

export const lazyLoad = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
) => {
  const LazyComponent = lazy(importFn)
  const fallback = options.fallback || defaultFallback

  return (props: React.ComponentProps<T>) => (
    <React.Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </React.Suspense>
  )
}

// Пример использования:
// const LazyDoctorsPage = lazyLoad(() => import('../pages/Doctors'))
// const LazyClinicsPage = lazyLoad(() => import('../pages/Clinics')) 