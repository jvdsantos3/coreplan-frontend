import { IOffer } from '../interfaces/IOffer'
import { IProduct } from '../interfaces/IProduct'

export const getProducts = () => {
  const products: IProduct[] = []

  // for (let i = 1; i < 21; i++) {
  //   const offer: null | IOffer =
  //     i % 2 === 0
  //       ? {
  //           name: 'Oferta 1',
  //           discount_percent: 2,
  //           value_with_dicount: 8000,
  //         }
  //       : null

  //   products.push({
  //     id: i,
  //     price: 10000,
  //     name: `Produto ${i}`,
  //     description: `Descrição do produto ${i}`,
  //     offer,
  //   })
  // }

  return products
}
