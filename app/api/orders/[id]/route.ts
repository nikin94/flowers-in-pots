import { NextRequest, NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongodb'
import { IOrder } from '@/lib/interfaces'
import { Order } from '@/models'

export const PUT = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id')
  const {
    customer,
    bank,
    deliveryType,
    items,
    price,
    isGiftIncluded,
    trackingId,
    shipped,
    completed
  }: IOrder = await req.json()
  const updatedData: any = {}

  if (customer) updatedData.customer = customer
  if (bank) updatedData.bank = bank
  if (deliveryType) updatedData.deliveryType = deliveryType
  if (items) updatedData.items = items
  if (price) updatedData.price = price
  if (isGiftIncluded) updatedData.isGiftIncluded = isGiftIncluded
  if (trackingId) updatedData.trackingId = trackingId
  if (shipped) updatedData.shipped = shipped
  if (completed) updatedData.completed = completed

  try {
    await connectMongoDB()
    const order = await Order.findByIdAndUpdate(id, updatedData)
    return NextResponse.json(
      { message: 'Order updated', order },
      { status: 200 }
    )
  } catch (error) {
    return new NextResponse(`Error in updating order: ${id}: ${error}`, {
      status: 500
    })
  }
}

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id')

  try {
    await connectMongoDB()
    const order = await Order.findOne({ _id: id })
    return NextResponse.json({ order }, { status: 200 })
  } catch (error) {
    return new NextResponse(`Error in getting order: ${id}: ${error}`, {
      status: 500
    })
  }
}
