import axios, { AxiosResponse } from 'axios'
import { getToken } from '../utils/sessionMethods'

const baseUrl = 'http://localhost:1005'

export const api = axios.create({
  baseURL: baseUrl,
})

api.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

const ignoredRoutes = ['/login', '/users']

async function error401handling(error: AxiosResponse) {
  return Promise.reject(error)
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      !ignoredRoutes.includes(error.config.url) &&
      error.response.status === 401
    ) {
      return error401handling(error)
    }

    return Promise.reject(error)
  },
)
