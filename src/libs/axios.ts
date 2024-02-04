import axios from 'axios'
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
