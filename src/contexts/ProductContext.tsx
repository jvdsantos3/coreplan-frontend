import { createContext, useEffect, useState } from 'react'
import { IProduct } from '../interfaces/IProduct'
import { Outlet } from 'react-router-dom'
import { ICartItem } from '../interfaces/ICartItem'
import { api } from '../libs/axios'

interface ProductContextType {
  products: IProduct[]
  cartItems: ICartItem[]
  cartLength: number
  totalCartValue: number
  addToCart: (product: IProduct, quantity: number) => void
  removeFromCart: (itemId: number) => void
  changeCartItemQuantity: (itemId: number, quantity: number) => void
  finalizeOrder: () => void
}

export const ProductContext = createContext({} as ProductContextType)

export function ProductProvider() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [cartItems, setCartItems] = useState<ICartItem[]>([])
  const [cartLength, setCartLength] = useState(0)
  const [totalCartValue, setTotalCartValue] = useState(0)

  function calculateTotal(items: ICartItem[]): number {
    let total = 0

    for (const item of items) {
      if (item.offers && item.offers.value_with_discount !== undefined) {
        total += item.offers.value_with_discount * item.quantity
      } else {
        total += item.price * item.quantity
      }
    }

    return total
  }

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

      setCartLength(state.length)
      setTotalCartValue(calculateTotal(state))

      return state
    })
  }

  const finalizeOrder = async () => {
    const orderItems = cartItems.map((item) => {
      return {
        product_id: item.id,
        quantity: item.quantity,
      }
    })

    await api
      .post('/orders', { order_items: orderItems })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  const getProducts = async () => {
    await api
      .get('/products')
      .then((response) => setProducts(response.data.data))
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    setCartLength(cartItems.length)
    setTotalCartValue(calculateTotal(cartItems))
  }, [cartItems])

  return (
    <ProductContext.Provider
      value={{
        products,
        cartItems,
        cartLength,
        totalCartValue,
        addToCart,
        removeFromCart,
        changeCartItemQuantity,
        finalizeOrder,
      }}
    >
      <Outlet />
    </ProductContext.Provider>
  )
}
