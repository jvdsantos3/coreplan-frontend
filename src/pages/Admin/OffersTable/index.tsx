import {
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from '@mui/material'
import { useOffer } from '../../../hooks/useOffer'
import { useProduct } from '../../../hooks/useProducts'
import { AddCircleOutline, Delete, Edit } from '@mui/icons-material'
import { OfferModalForm } from '../../../components/OfferModalForm'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IOffer } from '../../../interfaces/IOffer'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const formSchema = z.object({
  name: z.string().min(1, 'O campo Usuário é obrigatório.'),
  description: z.string().min(1, 'O campo Senha é obrigatório.'),
  discount_percent: z.coerce.number(),
  product_id: z.number(),
})

export type FormInputs = z.infer<typeof formSchema>

export const OffersTable = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [editOfferId, setEditOfferId] = useState(0)

  const { offers, addOffer, deleteOffer, editOffer } = useOffer()
  const { products } = useProduct()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_id: 0,
    },
  })

  const handleAddOffer = async (data: FormInputs) => {
    await addOffer(data)
    handleCloseCreateModal()
  }

  const handleEditOffer = async (data: FormInputs) => {
    await editOffer(editOfferId, data)

    handleCloseEditModal()
  }

  const handleClickOpenCreateModal = () => {
    reset()
    setOpenCreateModal(true)
  }

  const handleClickOpenEditModal = async (data: IOffer) => {
    setValue('name', data.name)
    setValue('description', data.description)
    setValue('discount_percent', data.discount_percent)
    setValue('product_id', data.product_id)

    setOpenEditModal(true)

    setEditOfferId(data.id)
  }

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingY: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.2rem',
          color: 'inherit',
        }}
      >
        Ofertas
      </Typography>

      <Button
        startIcon={<AddCircleOutline />}
        variant="contained"
        onClick={handleClickOpenCreateModal}
      >
        Adicionar Oferta
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{
                  maxWidth: '2rem',
                }}
              >
                ID
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  maxWidth: '3rem',
                }}
              >
                Nome
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  maxWidth: '5rem',
                }}
              >
                Descrição
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  maxWidth: '2rem',
                }}
              >
                Desconto
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  maxWidth: '2rem',
                }}
              >
                Produto
              </StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{
                    maxWidth: '2rem',
                  }}
                >
                  {row.id}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: '3rem',
                  }}
                >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: '5rem',
                  }}
                >
                  {row.description}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: '2rem',
                  }}
                >
                  {row.discount_percent + '%'}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: '3rem',
                  }}
                >
                  {row.product_name ? row.product_name : 'Geral'}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: 4,
                  }}
                >
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleClickOpenEditModal(row)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteOffer(row)}
                    sx={{
                      color: ({ palette }) => palette.error.main,
                    }}
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <OfferModalForm
        title="Adicionar Oferta"
        buttonText="Adicionar"
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        handleEvent={handleAddOffer}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        products={products}
        setValue={setValue}
      />

      <OfferModalForm
        title="Editar Oferta"
        buttonText="Editar"
        open={openEditModal}
        handleClose={handleCloseEditModal}
        handleEvent={handleEditOffer}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        products={products}
        setValue={setValue}
      />
    </Container>
  )
}
