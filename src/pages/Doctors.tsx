import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useApi } from '../hooks/useApi'
import { API_ENDPOINTS } from '../config/api'
import ResponsiveCard from '../components/ResponsiveCard'
import ResponsiveGrid from '../components/ResponsiveGrid'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorDisplay from '../components/ErrorDisplay'
import PageTransition from '../components/PageTransition'
import Pagination from '../components/Pagination'
import { showError } from '../utils/notifications'
import { apiClient } from '../utils/api'

interface Doctor {
  id: number
  firstName: string
  lastName: string
  specialization: string
  experience: number
  rating: number
}

const ITEMS_PER_PAGE = 6

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await apiClient.get('/doctors')
        setDoctors(response.data)
      } catch (err) {
        setError('Не удалось загрузить список врачей')
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Наши врачи</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              {doctor.firstName} {doctor.lastName}
            </h2>
            <p className="text-gray-600 mb-2">Специализация: {doctor.specialization}</p>
            <p className="text-gray-600 mb-2">Опыт работы: {doctor.experience} лет</p>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-gray-600">{doctor.rating.toFixed(1)}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Doctors 