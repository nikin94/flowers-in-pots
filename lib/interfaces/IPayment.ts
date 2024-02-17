export interface IPayment {
  orderId: string
  amount: number
  updatedAt: string
  isFullyPaid?: boolean
}
