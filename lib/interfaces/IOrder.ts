import { ICustomer, IOrderItem } from '@/lib/interfaces'
import { Bank, DeliveryType } from '@/lib/enums'

export interface IOrder {
  _id: string
  customer: ICustomer
  bank: Bank
  deliveryType: DeliveryType
  items?: IOrderItem[]
  price: {
    items: number
    delivery: number
    total: number
  }
  isGiftIncluded?: boolean
  trackingId?: number
  shipped?: number
  completed?: number
}
