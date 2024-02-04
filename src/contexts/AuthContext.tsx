import { createContext, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { IUser } from '../interfaces/IUser'
import { api } from '../libs/axios'
import { LoginInput } from '../interfaces/IUserInput'
import {
  getToken,
  getUser,
  removeTokens,
  storeTokens,
  storeUser,
} from '../utils/sessionMethods'

interface AuthContextType {
  user: IUser | null
  isLogged: boolean
  loading: boolean
  login: (data: LoginInput) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider() {
  const [isLogged, setIsLogged] = useState(!!getToken())
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<IUser | null>(getUser)

  const navigate = useNavigate()

  const login = async (data: LoginInput) => {
    setLoading(true)
    await api
      .post('/login', data)
      .then((response) => {
        const data = response.data.data

        setUser(data.user)
        storeUser(data.user)
        storeTokens(data.token)
        setIsLogged(true)
        setLoading(false)

        navigate('/home')
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  const logout = () => {
    removeTokens()
    setIsLogged(false)
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, isLogged, loading, login, logout }}>
      <Outlet />
    </AuthContext.Provider>
  )
}
