'use client'
import { useMemo } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
  }
}))

const OrderLinearProgressBar = ({
  value,
  fullPrice = 1
}: {
  value: number
  fullPrice: number
}) => {
  const progress = useMemo(() => (value * 100) / fullPrice, [value, fullPrice])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 1
      }}
    >
      <BorderLinearProgress
        variant='determinate'
        value={progress}
        sx={{ flex: 1, mx: 1 }}
      />
      <Typography variant='h6' component='h6' sx={{ fontWeight: '900' }}>
        {value}р
      </Typography>
    </Box>
  )
}

export default OrderLinearProgressBar
