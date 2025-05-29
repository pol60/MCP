import { useState, FormEvent } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import { ValidationRules, validateForm, showValidationErrors } from '../utils/validation'

interface ValidatedFormProps {
  onSubmit: (values: { [key: string]: any }) => Promise<void>
  validationRules: ValidationRules
  children: React.ReactNode
  submitButtonText?: string
  isLoading?: boolean
}

export default function ValidatedForm({
  onSubmit,
  validationRules,
  children,
  submitButtonText = 'Отправить',
  isLoading = false,
}: ValidatedFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values: { [key: string]: any } = {}

    // Собираем значения формы
    formData.forEach((value, key) => {
      values[key] = value
    })

    // Валидируем форму
    const validationErrors = validateForm(values, validationRules)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      showValidationErrors(validationErrors)
      return
    }

    // Очищаем ошибки и отправляем форму
    setErrors({})
    try {
      await onSubmit(values)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {children}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading}
        sx={{ mt: 3 }}
      >
        {isLoading ? <CircularProgress size={24} /> : submitButtonText}
      </Button>
    </Box>
  )
} 