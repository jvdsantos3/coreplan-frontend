import { createContext, useEffect, useState } from 'react'
import { IProduct } from '../interfaces/IProduct'
import { Outlet } from 'react-router-dom'
import { ICartItem } from '../interfaces/ICartItem'
import { api } from '../libs/axios'

interface ProductContextType {
  products: IProduct[]
  cartItems: ICartItem[]
  cartLength: number
  addToCart: (product: IProduct, quantity: number) => void
  removeFromCart: (itemId: number) => void
  changeCartItemQuantity: (itemId: number, quantity: number) => void
}

export const ProductContext = createContext({} as ProductContextType)

export function ProductProvider() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [cartItems, setCartItems] = useState<ICartItem[]>([
    // {
    //   id: 30,
    //   quantity: 1,
    //   price: 10000,
    //   name: 'Produto 30',
    //   description: 'Descrição do produto 30',
    //   offers: {
    //     name: 'Desconto produto 30',
    //     discount_percent: 20,
    //     value_with_discount: 8000,
    //   },
    // },
    // {
    //   id: 31,
    //   quantity: 1,
    //   price: 10000,
    //   name: 'Produto 31',
    //   description: 'Descrição do produto 31',
    //   offers: null,
    // },
    // {
    //   id: 32,
    //   quantity: 1,
    //   price: 10000,
    //   name: 'Produto 32',
    //   description: 'Descrição do produto 32',
    //   offers: null,
    // },
    // {
    //   id: 33,
    //   quantity: 1,
    //   price: 10000,
    //   name: 'Produto 33',
    //   description: 'Descrição do produto 33',
    //   offers: null,
    // },
    // {
    //   id: 34,
    //   quantity: 1,
    //   price: 10000,
    //   name: 'Produto 34',
    //   description: 'Descrição do produto 34',
    //   offers: null,
    // },
    // {
    //   id: 35,
    //   quantity: 1,
    //   price: 10000,
    //   name: 'Produto 35',
    //   description: 'Descrição do produto 35',
    //   offers: null,
    // },
    // {
    //   id: 36,
    //   quantity: 1,
    //   price: 10000,
    //   name: 'Produto 36',
    //   description: 'Descrição do produto 36',
    //   offers: null,
    // },
  ])

  const cartLength = cartItems.length
  console.log(cartLength)

  const addToCart = (product: IProduct, quantity: number) => {
    setCartItems((state) => {
      const existingItemIndex = state.findIndex(
        (item) => item.id === product.id,
      )

      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += quantity

        return state
      }

      return [...state, { ...product, quantity }]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCartItems((state) => state.filter((item) => item.id !== itemId))
  }

  const changeCartItemQuantity = (itemId: number, quantity: number) => {
    setCartItems((state) => {
      const existingItemIndex = state.findIndex((item) => item.id === itemId)

      state[existingItemIndex].quantity = quantity

      return state
    })
  }

  const getProducts = async () => {
    await api
      .get('/products')
      .then((response) => setProducts(response.data.data))
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <ProductContext.Provider
      value={{
        products,
        cartItems,
        cartLength,
        addToCart,
        removeFromCart,
        changeCartItemQuantity,
      }}
    >
      <Outlet />
    </ProductContext.Provider>
  )
}
