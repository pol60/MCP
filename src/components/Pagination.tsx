import { Pagination as MuiPagination, Box } from '@mui/material'

interface PaginationProps {
  count: number
  page: number
  onChange: (page: number) => void
  disabled?: boolean
}

export default function Pagination({ count, page, onChange, disabled }: PaginationProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
        disabled={disabled}
        showFirstButton
        showLastButton
      />
    </Box>
  )
} 