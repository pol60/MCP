import { useState, useEffect } from 'react'
import { Box, Skeleton } from '@mui/material'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  objectFit?: 'cover' | 'contain' | 'fill'
  className?: string
  onLoad?: () => void
  onError?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  className,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    const img = new Image()
    img.src = src

    img.onload = () => {
      setIsLoading(false)
      setImageSrc(src)
      onLoad?.()
    }

    img.onerror = () => {
      setIsLoading(false)
      setError(true)
      onError?.()
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src, onLoad, onError])

  if (error) {
    return (
      <Box
        sx={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.200',
          color: 'text.secondary',
        }}
      >
        Ошибка загрузки изображения
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
      }}
      className={className}
    >
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      )}
      <img
        src={imageSrc}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          display: isLoading ? 'none' : 'block',
        }}
      />
    </Box>
  )
} 