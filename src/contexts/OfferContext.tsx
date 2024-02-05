import { createContext, useEffect, useState } from 'react'
import { IOffer } from '../interfaces/IOffer'
import { Outlet } from 'react-router-dom'
import { api } from '../libs/axios'
import { toast } from 'react-toastify'

interface OfferContextType {
  offers: IOffer[]
  deleteOffer: (offer: IOffer) => void
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

  const deleteOffer = async (offer: IOffer) => {
    console.log(offer)
    await api
      .delete(`/offers/${offer.id}`)
      .then(async () => {
        await getOffer()
        toast.success(`Oferta ${offer.name} excluida com sucesso.`)
      })
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
        deleteOffer,
      }}
    >
      <Outlet />
    </OfferContext.Provider>
  )
}
