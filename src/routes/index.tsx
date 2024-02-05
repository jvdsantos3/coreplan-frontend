import {
  Routes,
  Route,
  useNavigate,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Home } from '../pages/Home'
import { ProductProvider } from '../contexts/ProductContext'
import { Cart } from '../pages/Cart'
import { Order } from '../pages/Orders'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { AuthProvider } from '../contexts/AuthContext'
import { ProductsTable } from '../pages/Admin/ProductsTable'
import { useEffect } from 'react'
import { OffersTable } from '../pages/Admin/OffersTable'
import { useAuth } from '../hooks/useAuth'
import { OfferProvider } from '../contexts/OfferContext'
import { AdminOrders } from '../pages/Admin/Orders'

const Admin = () => {
  const { user } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (Number(user?.role) === 2) {
      return navigate('/home', { replace: true })
    }

    if (location.pathname === '/admin') {
      navigate('/admin/produtos', { replace: true })
    }
  }, [navigate, user, location])

  return <Outlet />
}

const NormalUser = () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (Number(user?.role) === 1) {
      return navigate('/admin/produtos', { replace: true })
    }
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
            <Route path="/" element={<OfferProvider />}>
              <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<NormalUser />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/carrinho" element={<Cart />} />
                  <Route path="/pedidos" element={<Order />} />
                </Route>

                <Route path="/admin" element={<Admin />}>
                  <Route path="produtos" element={<ProductsTable />} />
                  <Route path="ofertas" element={<OffersTable />} />
                  <Route path="pedidos" element={<AdminOrders />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
