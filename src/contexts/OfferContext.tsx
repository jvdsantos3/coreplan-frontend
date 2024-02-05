import { createContext, useEffect, useState } from 'react'
import { IOffer } from '../interfaces/IOffer'
import { Outlet } from 'react-router-dom'
import { api } from '../libs/axios'

interface OfferContextType {
  offers: IOffer[]
}

export const OfferContext = createContext({} as OfferContextType)

export function OfferProvider() {
  const [offers, setOffer] = useState<IOffer[]>([])

  const getOffer = async () => {
    await api
      .get('/offers')
      .then((response) => setOffer(response.data.data))
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getOffer()
  }, [])

  return (
    <OfferContext.Provider
      value={{
        offers,
      }}
    >
      <Outlet />
    </OfferContext.Provider>
  )
}
