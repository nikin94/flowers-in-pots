import Link from 'next/link'
import formatDistance from 'date-fns/formatDistance'
import { ru } from 'date-fns/locale'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

import { IOrder, IPayment } from '@/lib/interfaces'

import OrderLinearProgressBar from './OrderLinearProgressBar'
import OrderBadge from './OrderBadge'
import OrderItemsList from './OrderItemsList'

type props = {
  order: IOrder
  payment: IPayment
}

const Order = ({ order, payment }: props) => {
  return (
    <Link href={'/orders/' + order._id}>
      <OrderBadge payment={payment}>
        <Card
          sx={{
            padding: 2,
            backgroundColor: '#fff',
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            ':hover': {
              boxShadow: 10
            }
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}
          >
            <Box sx={{ flex: 1 }}>
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
            </Box>
            <Box sx={{ flex: 1, textAlign: 'right' }}>
              <Typography>
                {order.shipped
                  ? 'Отправлен ' +
                    formatDistance(new Date(order.shipped), new Date(), {
                      addSuffix: true,
                      locale: ru
                    })
                  : 'Не отправлен'}
              </Typography>

              <Typography>{payment?.isFullyPaid}</Typography>
              {order.trackingId && (
                <Box sx={{ display: 'inline-flex' }}>
                  <LocalShippingIcon sx={{ mr: 1 }} />
                  <Typography>{order.trackingId}</Typography>
                </Box>
              )}
            </Box>
          </Box>
          <OrderItemsList items={order.items} />
          <OrderLinearProgressBar
            value={payment?.amount || 0}
            fullPrice={order.price.total}
          />
        </Card>
      </OrderBadge>
    </Link>
  )
}

export default Order
