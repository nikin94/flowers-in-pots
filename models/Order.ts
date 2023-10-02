import mongoose from 'mongoose'

const { Schema } = mongoose

enum DeliveryType {
  POST = 'post',
  BUS = 'bus',
  PICKUP = 'pickup'
}

enum Bank {
  TINKOFF = 'tinkoff',
  SBER = 'sber',
  RNCB = 'rncb'
}

interface ICustomer {
  name: string
  address: string
  phone: string
}

interface IOrder {
  customer: ICustomer
  bank: Bank
  deliveryType: DeliveryType
  items?: string[]
  price: {
    items: number
    delivery: number
    total: number
  }
  payment: {
    full?: { amount: number; date: Date }
    part?: { amount: number; date: Date }
  }
  trackingId?: number
  shipped?: Date
  completed?: Date
}

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
      type: Array,
      required: true
    },
    price: {
      items: { type: Number, required: true },
      delivery: { type: Number, required: true },
      total: { type: Number, required: true }
    },
    payment: {
      full: { amount: Number, date: Date },
      part: { amount: Number, date: Date }
    },
    trackingId: Number,
    shipped: Date,
    completed: Date
  },
  { timestamps: true }
)

orderSchema.method('price.total', function priceTotal() {
  return this.price.items + ' ' + this.price.delivery
})

export default mongoose.models.Order || mongoose.model('Order', orderSchema)
