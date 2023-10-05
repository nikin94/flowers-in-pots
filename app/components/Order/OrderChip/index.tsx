import { useMemo } from 'react'
import Chip, { ChipPropsColorOverrides } from '@mui/material/Chip'
import { OverridableStringUnion } from '@mui/types'
import { IPayment } from '@/lib/interfaces'

const OrderChip = ({ payment }: { payment: IPayment }) => {
  const chipData: {
    label: string
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
    if (!payment) return { label: 'Не оплачен', color: 'error' }
    return {
      label: payment.isFullyPaid ? 'Оплачен' : 'Частично оплачен',
      color: payment.isFullyPaid ? 'success' : 'warning'
    }
  }, [payment])
  return (
    <>
      <Chip
        label={chipData.label}
        color={chipData.color}
        variant='filled'
        sx={{ ml: 1 }}
      />
    </>
  )
}

export default OrderChip
