import { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { IUser } from '../interfaces/IUser'
import { api } from '../libs/axios'

interface LoginInput {
  user: string
  password: string
}

interface AuthContextType {
  user: IUser
  loading: boolean
  login: (data: LoginInput) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider() {
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState({
    user: 'Vins',
    password: '12345678',
    role: 2,
  })

  const login = async (data: LoginInput) => {
    setLoading(true)
    await api
      .post('/login', data)
      .then((response) => {
        console.log(response)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login }}>
      <Outlet />
    </AuthContext.Provider>
  )
}
