import { ReactNode, useMemo } from 'react'
import Badge from '@mui/material/Badge'
import CheckIcon from '@mui/icons-material/Check'
import Close from '@mui/icons-material/Close'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { ChipPropsColorOverrides } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import { IPayment } from '@/lib/interfaces'

const OrderBadge = ({
  payment,
  children
}: {
  payment: IPayment
  children: ReactNode
}) => {
  const badgeData: {
    content: ReactNode
    color: OverridableStringUnion<
      | 'default'
      | 'primary'
      | 'secondary'
      | 'error'
      | 'info'
      | 'success'
      | 'warning',
      ChipPropsColorOverrides
    >
  } = useMemo(() => {
    if (!payment)
      return {
        content: <Close />,
        color: 'error'
      }
    return {
      content: payment.isFullyPaid ? <CheckIcon /> : <HourglassBottomIcon />,
      color: payment.isFullyPaid ? 'success' : 'warning'
    }
  }, [payment])

  return (
    <Badge
      badgeContent={badgeData.content}
      color={badgeData.color}
      // anchorOrigin={{
      //   vertical: 'bottom',
      //   horizontal: 'right'
      // }}
      sx={{
        display: 'block',
        '& .MuiBadge-badge': {
          width: 30,
          height: 30,
          borderRadius: 15
        }
      }}
    >
      {children}
    </Badge>
  )
}

export default OrderBadge
