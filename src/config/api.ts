export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  users: {
    profile: '/users/profile',
    update: '/users/update',
  },
  doctors: {
    list: '/doctors',
    details: (id: number) => `/doctors/${id}`,
  },
  clinics: {
    list: '/clinics',
    details: (id: number) => `/clinics/${id}`,
  },
  appointments: {
    list: '/appointments',
    create: '/appointments',
    update: (id: number) => `/appointments/${id}`,
    delete: (id: number) => `/appointments/${id}`,
  },
  messages: {
    list: '/messages',
    send: '/messages',
  },
} 