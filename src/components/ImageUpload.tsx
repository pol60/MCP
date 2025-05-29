import { useState, useRef } from 'react'
import { Box, Button, Typography, CircularProgress } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import { uploadImage, validateImage } from '../utils/imageUpload'
import { showError } from '../utils/notifications'

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  maxSize?: number
  allowedTypes?: string[]
}

export default function ImageUpload({
  onUploadComplete,
  maxSize = 5 * 1024 * 1024,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!validateImage(file)) {
      return
    }

    setIsUploading(true)
    try {
      const result = await uploadImage(file)
      onUploadComplete(result.url)
    } catch (error) {
      showError('Ошибка при загрузке изображения')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <Box
      sx={{
        border: '2px dashed #ccc',
        borderRadius: 2,
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main',
        },
      }}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={allowedTypes.join(',')}
        style={{ display: 'none' }}
      />
      {isUploading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="body1" gutterBottom>
            Нажмите для загрузки изображения
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Поддерживаемые форматы: JPEG, PNG, GIF
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Максимальный размер: {maxSize / 1024 / 1024}MB
          </Typography>
        </>
      )}
    </Box>
  )
} 