import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Search, LocationOn, Phone, AccessTime } from '@mui/icons-material'
import axios from 'axios'

interface Clinic {
  id: number
  name: string
  address: string
  phone: string
  description: string
  services: string[]
  workingHours: string[]
}

export default function Clinics() {
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchClinics()
  }, [])

  const fetchClinics = async () => {
    try {
      const response = await axios.get('/api/clinics')
      setClinics(response.data)
    } catch (error) {
      console.error('Error fetching clinics:', error)
    }
  }

  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Клиники
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        placeholder="Поиск клиники или адреса"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredClinics.map((clinic) => (
          <Grid item xs={12} md={6} key={clinic.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="/images/clinic-placeholder.jpg"
                alt={clinic.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {clinic.name}
                </Typography>

                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText primary={clinic.address} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText primary={clinic.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AccessTime />
                    </ListItemIcon>
                    <ListItemText
                      primary="Режим работы"
                      secondary={clinic.workingHours.join(', ')}
                    />
                  </ListItem>
                </List>

                <Typography variant="body2" paragraph>
                  {clinic.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {clinic.services.map((service, index) => (
                    <Chip
                      key={index}
                      label={service}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                <Button variant="contained" fullWidth>
                  Выбрать клинику
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
} 