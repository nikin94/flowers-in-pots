import Link from 'next/link'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { IOrder, IPayment } from '@/lib/interfaces'

import OrderChip from './OrderChip'
import OrderLinearProgressBar from './OrderLinearProgressBar'

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
          justifyContent: 'space-between'
        }}
      >
        <Typography>{item.name}</Typography>
        <Divider sx={{ flex: 1, mt: 1, mx: 2, opacity: 0.5 }} />
        <Typography>{item.price}</Typography>
      </Box>
    ))

  return (
    <Link href={'/orders/' + order._id}>
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
              variant='body1'
              sx={{ fontWeight: 'bold', maxWidth: 200, whiteSpace: 'nowrap' }}
            >
              {order.customer.name}
            </Typography>
            <Typography>{order.customer.address}</Typography>
            <Typography>{order.customer.phone}</Typography>
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
            backgroundColor: '#ddd',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '1em'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555'
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
          <OrderChip payment={payment} />
        </Box>
      </Card>
    </Link>
  )
}

export default Order
