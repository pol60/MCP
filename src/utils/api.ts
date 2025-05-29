import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getCsrfHeader, refreshCsrfToken } from './csrf'
import { showError } from './notifications'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Добавляем CSRF токен к каждому запросу
apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const csrfHeader = getCsrfHeader()
    if (Object.keys(csrfHeader).length > 0) {
      config.headers = {
        ...config.headers,
        ...csrfHeader,
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Обработка ответов
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Если ошибка 401 и это не повторный запрос
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Обновляем CSRF токен
        await refreshCsrfToken()
        
        // Повторяем запрос с новым токеном
        const csrfHeader = getCsrfHeader()
        originalRequest.headers = {
          ...originalRequest.headers,
          ...csrfHeader,
        }
        
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Если не удалось обновить токен, перенаправляем на страницу входа
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // Обработка других ошибок
    if (error.response?.data?.message) {
      showError(error.response.data.message)
    } else {
      showError('Произошла ошибка при выполнении запроса')
    }

    return Promise.reject(error)
  }
)

export default apiClient 