import mongoose from 'mongoose'
import { IOrder, IOrderItem } from '@/lib/interfaces'
import { Bank, DeliveryType } from '@/lib/enums'

const { Schema } = mongoose

const orderSchema = new Schema<IOrder>(
  {
    customer: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true }
    },
    bank: { type: String, enum: Bank },
    deliveryType: { type: String, enum: DeliveryType },
    items: {
      type: Array<IOrderItem>,
      required: true
    },
    price: {
      items: { type: Number, required: true },
      delivery: { type: Number, required: true },
      total: { type: Number, required: true }
    },
    trackingId: Number,
    shipped: Date,
    completed: Date
  },
  { timestamps: true }
)

export default mongoose.models.Order || mongoose.model('Order', orderSchema)
