import connectMongoDB from '@/lib/mongodb'
import Order from '@/models/Order'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (request: NextRequest, { params }) => {
  const { id } = params
  const { trackingId } = await request.json() // temp
  await connectMongoDB()
  const order = await Order.findByIdAndUpdate(id, { trackingId })
  return NextResponse.json({ message: 'Order updated', order }, { status: 200 })
}

export const GET = async (request: NextRequest, { params }) => {
  const { id } = params
  await connectMongoDB()
  const order = await Order.findOne({ _id: id })
  return NextResponse.json({ order }, { status: 200 })
}
