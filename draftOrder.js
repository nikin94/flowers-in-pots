export const draftOrder = {
  customer: {
    name: 'John Smith',
    address: '2 Walnut Grove, Letterkenny, Ireland',
    phone: '+353851234567'
  },
  bank: 'rncb',
  deliveryType: 'post',
  items: ['Item #1', 'Some item #2', 'Another item #3'],
  price: {
    items: 1555,
    delivery: 350,
    total: 1905
  },
  payment: {
    full: { amount: 1905, date: Date.now() - 1000 * 60 * 60 * 12 }
  },
  trackingId: 123456789,
  shipped: Date.now() - 1000 * 60 * 60 * 24,
  completed: Date.now()
}
