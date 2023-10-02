import { NextResponse, NextRequest } from 'next/server'
import connectMongoDB from '@/lib/mongodb'
import Order from '@/models/Order'
// import { draftOrder } from '@/draftOrder'

export const POST = async (request: NextRequest) => {
  try {
    const newOrder = await request.json()
    await connectMongoDB()
    const order = await Order.create(newOrder)
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
