import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Home } from '../pages/Home'
import { ProductProvider } from '../contexts/ProductContext'
import { Cart } from '../pages/Cart'
import { Order } from '../pages/Order'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { AuthProvider } from '../contexts/AuthContext'
import { ProductsTable } from '../pages/Admin/ProductsTable'
import { useEffect } from 'react'
import { OffersTable } from '../pages/Admin/OffersTable'

const Admin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/admin/produtos', { replace: true })
  }, [navigate])

  return <Outlet />
}

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthProvider />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<ProductProvider />}>
            <Route path="/home" element={<Home />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/pedidos" element={<Order />} />

            <Route path="/admin" element={<Admin />}>
              <Route path="produtos" element={<ProductsTable />} />
              <Route path="ofertas" element={<OffersTable />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
