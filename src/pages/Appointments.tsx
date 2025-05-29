import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material'
import { Delete, Edit, Add } from '@mui/icons-material'
import axios from 'axios'

interface Appointment {
  id: number
  doctor: {
    id: number
    user: {
      firstName: string
      lastName: string
    }
    specialization: string
  }
  clinic: {
    id: number
    name: string
    address: string
  }
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'cancelled'
  notes?: string
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [doctors, setDoctors] = useState([])
  const [clinics, setClinics] = useState([])

  useEffect(() => {
    fetchAppointments()
    fetchDoctors()
    fetchClinics()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments')
      setAppointments(response.data)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  }

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/doctors')
      setDoctors(response.data)
    } catch (error) {
      console.error('Error fetching doctors:', error)
    }
  }

  const fetchClinics = async () => {
    try {
      const response = await axios.get('/api/clinics')
      setClinics(response.data)
    } catch (error) {
      console.error('Error fetching clinics:', error)
    }
  }

  const handleCreateAppointment = async (appointmentData: Partial<Appointment>) => {
    try {
      await axios.post('/api/appointments', appointmentData)
      fetchAppointments()
      setOpenDialog(false)
    } catch (error) {
      console.error('Error creating appointment:', error)
    }
  }

  const handleUpdateAppointment = async (id: number, appointmentData: Partial<Appointment>) => {
    try {
      await axios.put(`/api/appointments/${id}`, appointmentData)
      fetchAppointments()
      setOpenDialog(false)
    } catch (error) {
      console.error('Error updating appointment:', error)
    }
  }

  const handleDeleteAppointment = async (id: number) => {
    try {
      await axios.delete(`/api/appointments/${id}`)
      fetchAppointments()
    } catch (error) {
      console.error('Error deleting appointment:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success'
      case 'cancelled':
        return 'error'
      default:
        return 'warning'
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Записи на прием</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setSelectedAppointment(null)
            setOpenDialog(true)
          }}
        >
          Новая запись
        </Button>
      </Box>

      <Paper>
        <List>
          {appointments.map((appointment) => (
            <ListItem key={appointment.id} divider>
              <ListItemText
                primary={`Доктор: ${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Клиника: {appointment.clinic.name}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Дата: {new Date(appointment.date).toLocaleDateString()}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Время: {appointment.time}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Chip
                  label={appointment.status}
                  color={getStatusColor(appointment.status)}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => {
                    setSelectedAppointment(appointment)
                    setOpenDialog(true)
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteAppointment(appointment.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedAppointment ? 'Редактировать запись' : 'Новая запись'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Доктор"
                defaultValue={selectedAppointment?.doctor.id || ''}
              >
                {doctors.map((doctor: any) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.user.firstName} {doctor.user.lastName} - {doctor.specialization}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Клиника"
                defaultValue={selectedAppointment?.clinic.id || ''}
              >
                {clinics.map((clinic: any) => (
                  <MenuItem key={clinic.id} value={clinic.id}>
                    {clinic.name} - {clinic.address}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Дата"
                defaultValue={selectedAppointment?.date || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="time"
                label="Время"
                defaultValue={selectedAppointment?.time || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Примечания"
                defaultValue={selectedAppointment?.notes || ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button
            variant="contained"
            onClick={() => {
              // Handle form submission
              setOpenDialog(false)
            }}
          >
            {selectedAppointment ? 'Сохранить' : 'Создать'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
} 