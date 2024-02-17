'use client'
import Link from 'next/link'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Paid, LocalShipping, ContentCopy } from '@mui/icons-material'

import { IOrder, IPayment } from '@/lib/interfaces'

import OrderLinearProgressBar from './OrderLinearProgressBar'
import OrderBadge from './OrderBadge'
import OrderItemsList from './OrderItemsList'

interface OrderProps {
  order: IOrder
  payment: IPayment
}

const Order = ({ order, payment }: OrderProps) => {
  const renderShipmentStatus = () => (
    <Box sx={{ display: 'inline-flex', gap: 1 }}>
      <Typography>Отправлен:</Typography>
      <Box flex={1} />
      {order.shipped ? (
        <Typography fontWeight='bold'>
          {format(new Date(order.shipped), 'dd.MM.yy', { locale: ru })}
        </Typography>
      ) : (
        <Typography alignSelf='flex-end' fontWeight='bold'>
          Не отправлен
        </Typography>
      )}
    </Box>
  )

  const renderTrackingId = () => {
    if (!order.trackingId) return null

    return (
      <Box sx={{ display: 'inline-flex', gap: 1 }}>
        <Typography>Трек-номер:</Typography>
        <Box flex={1} />
        <Box
          display='flex'
          flexDirection='row'
          onClick={event => {
            event.preventDefault()
            event.stopPropagation()
            navigator.clipboard.writeText(order.trackingId?.toString()!)
          }}
        >
          <ContentCopy fontSize='small' />
          <Typography fontWeight='bold'>{order.trackingId}</Typography>
        </Box>
      </Box>
    )
  }

  const renderPaymentStatus = () => (
    <Box sx={{ display: 'inline-flex', gap: 1 }}>
      <Typography>Оплата:</Typography>
      <Box flex={1} />
      {payment ? (
        <Box sx={{ display: 'inline-flex', gap: 1 }}>
          {!payment?.isFullyPaid && (
            <Typography fontWeight='bold'>Частично,</Typography>
          )}
          <Typography fontWeight='bold'>
            {format(new Date(payment.updatedAt), 'dd.MM.yy', { locale: ru })}
          </Typography>
        </Box>
      ) : (
        <Typography alignSelf='flex-end' fontWeight='bold'>
          Не оплачен
        </Typography>
      )}
    </Box>
  )

  return (
    <Link href={'/orders/' + order._id} style={{ position: 'relative' }}>
      <OrderBadge
        content={<LocalShipping sx={{ color: 'white' }} />}
        bgcolor={
          order.shipped ? (order.completed ? '#4caf50' : '#ff9800') : 'red'
        }
        hoverText={
          order.shipped
            ? order.completed
              ? 'Доставлен'
              : 'Отправлен'
            : 'Не отправлен'
        }
        style={{ right: 55 }}
      />
      <OrderBadge
        content={<Paid sx={{ color: 'white' }} />}
        bgcolor={
          payment ? (payment.isFullyPaid ? '#4caf50' : '#ff9800') : 'red'
        }
        hoverText={
          payment
            ? payment.isFullyPaid
              ? 'Полностью оплачен'
              : 'Частично оплачен'
            : 'Не оплачен'
        }
      />
      <Card
        sx={{
          p: 2,
          pt: 3,
          backgroundColor: '#fff',
          height: 300,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          ':hover': {
            boxShadow: 10
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: '700',
              lineHeight: 1.2,
              overflow: 'hidden'
            }}
          >
            {order.customer.name}
          </Typography>
          {renderPaymentStatus()}
          {renderShipmentStatus()}
          {renderTrackingId()}
        </Box>
        <OrderItemsList items={order.items} />
        <OrderLinearProgressBar
          value={payment?.amount || 0}
          fullPrice={order.price.total}
        />
      </Card>
    </Link>
  )
}

export default Order
