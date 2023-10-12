import { Bank, DeliveryType } from '@/lib/enums'

export const draftOrder = {
  _id: 'afaf234faf14124',
  customer: {
    name: 'John Smith',
    address: '2 Walnut Grove, Letterkenny, Ireland',
    phone: '+353851234567'
  },
  bank: 'rncb' as Bank,
  deliveryType: 'post' as DeliveryType,
  items: [
    {
      name: 'Алоказия',
      price: 500
    },
    {
      name: 'Костус',
      price: 500
    },
    {
      name: 'Папоротник',
      price: 500
    },
    {
      name: 'Кактус',
      price: 500
    },
    {
      name: 'Алоказия2',
      price: 500
    },
    {
      name: 'Костус2',
      price: 500
    },
    {
      name: 'Папоротник2',
      price: 500
    },
    {
      name: 'Кактус2',
      price: 500
    }
  ],
  price: {
    items: 4000,
    delivery: 400,
    total: 4400
  },
  trackingId: 123456789,
  shipped: 1696260139342 - 1000 * 60 * 60 * 24,
  completed: 1696260139342
}
