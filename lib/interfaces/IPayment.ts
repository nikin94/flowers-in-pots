export interface IPayment {
  orderId: string
  amount: number
  isFullyPaid?: boolean
}
