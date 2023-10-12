import { NextResponse, NextRequest } from 'next/server'
import connectMongoDB from '@/lib/mongodb'
import { Order } from '@/models'

export const POST = async (request: NextRequest) => {
  try {
    const newOrder = await request.json()
    await connectMongoDB()
    const orderWithMaxNumber = await Order.findOne({
      orderNumber: { $exists: true }
    }).sort({ orderNumber: -1 })
    const order = await Order.create({
      ...newOrder,
      orderNumber: (orderWithMaxNumber.orderNumber || 0) + 1
    })
    console.log(order)
    return NextResponse.json(
      { message: 'Order created', order },
      { status: 201 }
    )
  } catch (error) {
    return new NextResponse('Error in posting order: ' + error, {
      status: 500
    })
  }
}

export const GET = async () => {
  try {
    await connectMongoDB()
    const orders = await Order.find()
    return NextResponse.json({ orders })
  } catch (error) {
    return new NextResponse('Error in fetching orders: ' + error, {
      status: 500
    })
  }
}

export const DELETE = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get('id')

  try {
    await connectMongoDB()
    const order = await Order.findByIdAndDelete(id)
    return NextResponse.json(
      { message: 'Order deleted', order },
      { status: 200 }
    )
  } catch (error) {
    return new NextResponse(`Error in deleting order: ${id}: ${error}`, {
      status: 500
    })
  }
}
