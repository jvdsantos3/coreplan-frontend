import { useContext } from 'react'
import { OfferContext } from '../contexts/OfferContext'

export const useOffer = () => {
  const context = useContext(OfferContext)

  return context
}
