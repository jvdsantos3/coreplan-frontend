import { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext'

export const useProduct = () => {
  const context = useContext(ProductContext)

  return context
}
