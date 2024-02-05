export interface IOrder {
  order: {
    id: number
    order_id: number
    total_value: number
    total_value_with_discounts: number
    created_at: string
  }
  order_items: [
    {
      name: string
      description: string
      original_price: number
      price_with_discount: number
      quantity: number
    },
  ]
}
