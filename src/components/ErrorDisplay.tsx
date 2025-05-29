import { Alert, AlertTitle, Box } from '@mui/material'
import { ApiError } from '../utils/api'

interface ErrorDisplayProps {
  error: ApiError | null
  onClose?: () => void
}

export default function ErrorDisplay({ error, onClose }: ErrorDisplayProps) {
  if (!error) return null

  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity="error" onClose={onClose}>
        <AlertTitle>Ошибка</AlertTitle>
        {error.message}
        {error.errors && (
          <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
            {Object.entries(error.errors).map(([field, messages]) => (
              <li key={field}>
                {field}: {messages.join(', ')}
              </li>
            ))}
          </Box>
        )}
      </Alert>
    </Box>
  )
} 