import { Card, CardContent, CardMedia, Box, useTheme, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion'

interface ResponsiveCardProps {
  image?: string
  title: string
  children: React.ReactNode
  onClick?: () => void
}

export default function ResponsiveCard({ image, title, children, onClick }: ResponsiveCardProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: theme.shadows[4],
          },
        }}
        onClick={onClick}
      >
        {image && (
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              width: isMobile ? '100%' : 200,
              height: isMobile ? 200 : 'auto',
              objectFit: 'cover',
            }}
          />
        )}
        <CardContent sx={{ flex: 1, p: isMobile ? 2 : 3 }}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
} 