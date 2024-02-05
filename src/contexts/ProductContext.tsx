import { createContext, useEffect, useState } from 'react'
import { IProduct } from '../interfaces/IProduct'
import { Outlet, useNavigate } from 'react-router-dom'
import { ICartItem } from '../interfaces/ICartItem'
import { api } from '../libs/axios'
import { toast } from 'react-toastify'
import { IOrder } from '../interfaces/IOrder'

interface ProductInputs {
  name: string
  description: string
  price: number
}

interface ProductContextType {
  products: IProduct[]
  cartItems: ICartItem[]
  orders: IOrder[]
  cartLength: number
  totalCartValue: number
  addToCart: (product: IProduct, quantity: number) => void
  removeFromCart: (itemId: number) => void
  changeCartItemQuantity: (itemId: number, quantity: number) => void
  finalizeOrder: () => void
  addProduct: (data: ProductInputs) => void
  deleteProduct: (product: IProduct) => void
}

export const ProductContext = createContext({} as ProductContextType)

export function ProductProvider() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [cartItems, setCartItems] = useState<ICartItem[]>([])
  const [orders, setOrders] = useState<IOrder[]>([])
  const [cartLength, setCartLength] = useState(0)
  const [totalCartValue, setTotalCartValue] = useState(0)

  const navigate = useNavigate()

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
      .then(async () => {
        navigate('/home')

        setCartItems([])
        setCartLength(0)
        setTotalCartValue(0)
        await getOrders()

        toast.success('Pedido finalizado com sucesso.')
      })
      .catch((error) => console.log(error))
  }

  const getProducts = async () => {
    await api
      .get('/products')
      .then((response) => setProducts(response.data.data))
  }

  const addProduct = async (data: ProductInputs) => {
    await api.post('/products', data).then(() => {
      getProducts()
      toast.success('Produto cadastrado com sucesso.')
    })
  }

  const getOrders = async () => {
    await api
      .get('/resume/orders/user')
      .then((response) => {
        const data = response.data.data
        setOrders(data)
      })
      .catch((error) => console.log(error))
  }

  const deleteProduct = async (product: IProduct) => {
    console.log(product)
    await api
      .delete(`/products/${product.id}`)
      .then(async () => {
        await getProducts()
        toast.success(`Produto ${product.name} excluido com sucesso.`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getProducts()
    getOrders()
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
        orders,
        cartLength,
        totalCartValue,
        addToCart,
        removeFromCart,
        changeCartItemQuantity,
        finalizeOrder,
        addProduct,
        deleteProduct,
      }}
    >
      <Outlet />
    </ProductContext.Provider>
  )
}
