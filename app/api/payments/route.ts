import { NextRequest, NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongodb'
import { Payment } from '@/models'

export const POST = async (req: NextRequest) => {
  try {
    const { orderId, amount, isFullyPaid } = await req.json()
    if (!orderId || !amount)
      return new NextResponse('Missing payment data', { status: 400 })

    await connectMongoDB()
    const payment = await Payment.create({
      orderId,
      amount,
      isFullyPaid
    })
    return NextResponse.json(
      { message: 'Payment created', payment },
      { status: 201 }
    )
  } catch (error) {
    return new NextResponse('Error in posting payment: ' + error, {
      status: 500
    })
  }
}

export const GET = async () => {
  try {
    await connectMongoDB()
    const payments = await Payment.find()
    return NextResponse.json({ payments })
  } catch (error) {
    return new NextResponse('Error in fetching payments: ' + error, {
      status: 500
    })
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const { paymentId } = await req.json()
    await connectMongoDB()
    const payment = await Payment.findByIdAndDelete(paymentId)
    return NextResponse.json(
      { message: 'Payment deleted', payment },
      { status: 200 }
    )
  } catch (error) {
    return new NextResponse('Error in deleting payment: ' + error, {
      status: 500
    })
  }
}
