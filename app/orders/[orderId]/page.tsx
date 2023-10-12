const Order = ({ params }: { params: { orderId: string } }) => {
  const { orderId } = params

  return <>Order page {orderId}</>
}

export default Order
