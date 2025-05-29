import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool, db, runMigrations } from './config/database'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import doctorRoutes from './routes/doctors'
import clinicRoutes from './routes/clinics'
import appointmentRoutes from './routes/appointments'
import messageRoutes from './routes/messages'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/clinics', clinicRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/messages', messageRoutes)

const PORT = process.env.PORT || 5000

// Запускаем миграции
runMigrations()
  .then(() => {
    console.log('Migrations completed')
    // Проверяем подключение к базе данных
    pool.query('SELECT NOW()', (err) => {
      if (err) {
        console.error('Error connecting to database:', err)
      } else {
        console.log('Database connected')
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`)
        })
      }
    })
  })
  .catch((error) => {
    console.error('Error during migrations:', error)
  }) 