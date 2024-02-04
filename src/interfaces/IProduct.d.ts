import { IOffer } from './IOffer'

export interface IProduct {
  id: number
  price: number
  name: string
  description: string
  offers: null | IOffer
}
