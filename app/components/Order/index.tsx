import Link from 'next/link'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { IOrder, IPayment } from '@/lib/interfaces'

import OrderLinearProgressBar from './OrderLinearProgressBar'
import OrderBadge from './OrderBadge'

type props = {
  order: IOrder
  payment: IPayment
}

const Order = ({ order, payment }: props) => {
  const renderItems = () =>
    order.items?.map((item, index) => (
      <Box
        key={item.name + index}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#fff'
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        >
          {item.name}
        </Typography>
        <Divider sx={{ flex: 1, mt: 1, mx: 2, opacity: 0.5 }} />
        <Typography sx={{ fontWeight: 700 }}>{item.price}</Typography>
      </Box>
    ))

  return (
    <Link href={'/orders/' + order._id}>
      <OrderBadge payment={payment}>
        <Card
          sx={{
            padding: 2,
            backgroundColor: '#fff',
            height: 300,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: '700',
                  // maxWidth: 200,
                  // whiteSpace: 'nowrap',
                  // textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                {order.customer.name}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography>{payment?.isFullyPaid}</Typography>
              <Typography>{order.trackingId}</Typography>
              <Typography>{order.shipped}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              overflow: 'auto',
              p: 1,
              backgroundColor: '#6fc4f3',
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': {
                width: '0.4em'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ddd'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#eee'
              }
            }}
          >
            {renderItems()}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <OrderLinearProgressBar
              value={payment?.amount || 0}
              fullPrice={order.price.total}
            />
          </Box>
        </Card>
      </OrderBadge>
    </Link>
  )
}

export default Order
