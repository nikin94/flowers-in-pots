import Grid from '@mui/material/Unstable_Grid2'
import { Order } from '@/app/components'
import { IOrder, IPayment } from '@/lib/interfaces'

const OrdersList = async () => {
  const { orders } = await getOrders()
  const { payments } = await getPayments()

  const getPayment = (orderId: string) =>
    payments.find((p: IPayment) => p.orderId === orderId)

  const renderOrders = () =>
    orders.map((order: IOrder) => (
      <Grid xs={4} key={order._id}>
        <Order order={order} payment={getPayment(order._id)} />
      </Grid>
    ))

  return (
    <Grid container spacing={4}>
      {renderOrders()}
    </Grid>
  )
}

const getOrders = async () => {
  try {
    const res = await fetch(process.env.DOMAIN + 'api/orders', {
      cache: 'no-store'
    })

    if (!res.ok) throw new Error('Failed to fetch orders')
    return res.json()
  } catch (err) {
    console.log('Failed loading orders: ' + err)
  }
}

const getPayments = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/payments', {
      cache: 'no-store'
    })

    if (!res.ok) throw new Error('Failed to fetch payments')
    return res.json()
  } catch (err) {
    console.log('Failed loading payments: ' + err)
  }
}

export default OrdersList
