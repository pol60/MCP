import { Grid, useTheme, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion'

interface ResponsiveGridProps {
  children: React.ReactNode
  spacing?: number
}

export default function ResponsiveGrid({ children, spacing = 3 }: ResponsiveGridProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Grid
        container
        spacing={isMobile ? spacing / 2 : spacing}
        sx={{
          padding: isMobile ? 1 : 2,
        }}
      >
        {children}
      </Grid>
    </motion.div>
  )
} 