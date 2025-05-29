import { showError } from './notifications'

export interface ValidationRule {
  validate: (value: any) => boolean
  message: string
}

export interface ValidationRules {
  [key: string]: ValidationRule[]
}

export interface ValidationErrors {
  [key: string]: string[]
}

export const required = (message = 'Это поле обязательно'): ValidationRule => ({
  validate: (value) => value !== undefined && value !== null && value !== '',
  message,
})

export const minLength = (length: number, message?: string): ValidationRule => ({
  validate: (value) => !value || value.length >= length,
  message: message || `Минимальная длина ${length} символов`,
})

export const maxLength = (length: number, message?: string): ValidationRule => ({
  validate: (value) => !value || value.length <= length,
  message: message || `Максимальная длина ${length} символов`,
})

export const email = (message = 'Некорректный email'): ValidationRule => ({
  validate: (value) =>
    !value ||
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
  message,
})

export const phone = (message = 'Некорректный номер телефона'): ValidationRule => ({
  validate: (value) =>
    !value ||
    /^\+?[1-9]\d{10,14}$/.test(value.replace(/\D/g, '')),
  message,
})

export const password = (message = 'Пароль должен содержать минимум 8 символов, включая буквы и цифры'): ValidationRule => ({
  validate: (value) =>
    !value ||
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
  message,
})

export const validateField = (
  value: any,
  rules: ValidationRule[]
): string[] => {
  const errors: string[] = []
  rules.forEach((rule) => {
    if (!rule.validate(value)) {
      errors.push(rule.message)
    }
  })
  return errors
}

export const validateForm = (
  values: { [key: string]: any },
  rules: ValidationRules
): ValidationErrors => {
  const errors: ValidationErrors = {}
  Object.keys(rules).forEach((field) => {
    const fieldErrors = validateField(values[field], rules[field])
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors
    }
  })
  return errors
}

export const showValidationErrors = (errors: ValidationErrors) => {
  Object.values(errors).forEach((fieldErrors) => {
    fieldErrors.forEach((error) => showError(error))
  })
} 