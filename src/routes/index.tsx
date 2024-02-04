import { Routes, Route, useNavigate, Outlet, Navigate } from 'react-router-dom'
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
import { useAuth } from '../hooks/useAuth'

const Admin = () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (Number(user?.role) === 2) {
      return navigate('/home', { replace: true })
    }

    navigate('/admin/produtos', { replace: true })
  }, [navigate, user])

  return <Outlet />
}

const NormalUser = () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (Number(user?.role) === 1) {
      return navigate('/admin/produtos', { replace: true })
    }

    navigate('/home', { replace: true })
  }, [navigate, user])

  return <Outlet />
}

const Private = () => {
  const { isLogged } = useAuth()

  if (!isLogged) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthProvider />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Private />}>
          <Route path="/" element={<ProductProvider />}>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/" element={<NormalUser />}>
                <Route path="/home" element={<Home />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/pedidos" element={<Order />} />
              </Route>

              <Route path="/admin" element={<Admin />}>
                <Route path="produtos" element={<ProductsTable />} />
                <Route path="ofertas" element={<OffersTable />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
