import { ICustomer, IOrderItem } from '@/lib/interfaces'
import { Bank, DeliveryType } from '@/lib/enums'

export interface IOrder {
  _id: string
  customer: ICustomer
  bank: Bank
  deliveryType: DeliveryType
  orderNumber: number
  items: IOrderItem[]
  price: {
    items: number
    delivery: number
    total: number
  }
  trackingId?: number
  shipped?: number
  completed?: number
}
