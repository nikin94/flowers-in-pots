import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

interface OrderBadgeProps {
  content: ReactNode
  hoverText: string
  bgcolor?: string
  style?: React.CSSProperties
}

const OrderBadge = ({
  content,
  bgcolor,
  hoverText,
  style
}: OrderBadgeProps) => {
  return (
    <Tooltip
      title={hoverText}
      placement='top'
      arrow
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -8]
              }
            }
          ]
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 36,
          height: 36,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          overflow: 'hidden',
          bgcolor: bgcolor || 'red',
          position: 'absolute',
          top: -18,
          right: 10,
          zIndex: 1,
          ...style
        }}
      >
        {content}
      </Box>
    </Tooltip>
  )
}

export default OrderBadge
