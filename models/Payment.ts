import mongoose from 'mongoose'
import { IPayment } from '@/lib/interfaces'

const { Schema } = mongoose

const orderSchema = new Schema<IPayment>(
  {
    orderId: { type: String, unique: true },
    isFullyPaid: Boolean,
    amount: Number
  },
  { timestamps: true }
)

export default mongoose.models.Payment || mongoose.model('Payment', orderSchema)
