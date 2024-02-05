import { createContext, useEffect, useState } from 'react'
import { IOffer } from '../interfaces/IOffer'
import { Outlet } from 'react-router-dom'
import { api } from '../libs/axios'
import { toast } from 'react-toastify'

interface OfferInputs {
  name: string
  description: string
  discount_percent: number
  product_id?: number
}

interface OfferContextType {
  offers: IOffer[]
  addOffer: (data: OfferInputs) => Promise<void>
  editOffer: (idProduct: number, data: OfferInputs) => Promise<void>
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

  const addOffer = async (data: OfferInputs) => {
    console.log(data)
    if (data.product_id === 0) {
      delete data.product_id
    }
    await api
      .post(`/offers`, data)
      .then(async () => {
        await getOffer()
        toast.success(`Oferta criada com sucesso.`)
      })
      .catch(() => {
        toast.error(`Erro ao criar oferta.`)
      })
  }

  const editOffer = async (idProduct: number, data: OfferInputs) => {
    console.log(idProduct, data)
    if (data.product_id === 0) {
      data.product_id = null
    }
    await api
      .put(`/offers/${idProduct}`, data)
      .then(async () => {
        await getOffer()
        toast.success(`Oferta atualizada com sucesso.`)
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
        addOffer,
        editOffer,
      }}
    >
      <Outlet />
    </OfferContext.Provider>
  )
}
