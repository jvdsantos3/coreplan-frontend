import { Routes, Route } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Home } from '../pages/Home'
import { ProductProvider } from '../contexts/ProductContext'
import { Cart } from '../pages/Cart'
import { Order } from '../pages/Order'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductProvider />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/pedidos" element={<Order />} />
      </Route>
    </Routes>
  )
}
