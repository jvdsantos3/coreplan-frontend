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
import { toast } from 'react-toastify'

interface AuthContextType {
  user: IUser | null
  isLogged: boolean
  loading: boolean
  login: (data: LoginInput) => Promise<void>
  register: (data: LoginInput) => Promise<void>
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
        toast.success('Bem vindo, ' + response.data.data.user.username)
        navigate('/home')
      })
      .catch((error) => {
        toast.error(error.response.data.error)
        setLoading(false)
      })
  }

  const register = async (data: LoginInput) => {
    setLoading(true)

    await api
      .post('/users', data)
      .then(() => {
        toast.success('Cadastro realizado com sucesso!')
        navigate('/')
        setLoading(false)
      })
      .catch(() => {
        toast.error('Erro ao realizar requisição')
        setLoading(false)
      })
  }

  const logout = () => {
    removeTokens()
    setIsLogged(false)
    setUser(null)
    toast.error('Até logo :(')
    navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        loading,
        login,
        register,
        logout,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  )
}
