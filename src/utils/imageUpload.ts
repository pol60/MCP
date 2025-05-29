import { showError, showSuccess } from './notifications'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif']

export interface ImageUploadResult {
  url: string
  filename: string
}

export const validateImage = (file: File): boolean => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    showError('Неподдерживаемый формат файла. Разрешены только JPEG, PNG и GIF')
    return false
  }

  if (file.size > MAX_FILE_SIZE) {
    showError('Размер файла превышает 5MB')
    return false
  }

  return true
}

export const uploadImage = async (file: File): Promise<ImageUploadResult> => {
  if (!validateImage(file)) {
    throw new Error('Ошибка валидации изображения')
  }

  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Ошибка загрузки изображения')
    }

    const data = await response.json()
    showSuccess('Изображение успешно загружено')
    return data
  } catch (error) {
    showError('Ошибка при загрузке изображения')
    throw error
  }
}

export const getImageUrl = (filename: string): string => {
  return `/uploads/${filename}`
} 