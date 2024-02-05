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
import { useProduct } from '../../../hooks/useProducts'
import { AddCircleOutline, Delete, Edit } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/currency'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ProductModalForm } from '../../../components/ProductModalForm'
import { IProduct } from '../../../interfaces/IProduct'

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
  price: z.coerce.number(),
})

export type FormInputs = z.infer<typeof formSchema>

export const ProductsTable = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [editProductId, setEditProductId] = useState(0)

  const { products, addProduct, editProduct } = useProduct()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  })

  const handleAddProduct = async (data: FormInputs) => {
    await addProduct(data)
    handleCloseCreateModal()
  }

  const handleEditProduct = async (data: FormInputs) => {
    await editProduct(editProductId, data)

    handleCloseEditModal()
  }

  const handleClickOpenCreateModal = () => {
    reset()
    setOpenCreateModal(true)
  }

  const handleClickOpenEditModal = async (data: IProduct) => {
    setValue('name', data.name)
    setValue('description', data.description)
    setValue('price', data.price)

    setEditProductId(data.id)

    setOpenEditModal(true)
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
        Produtos
      </Typography>

      <Button
        startIcon={<AddCircleOutline />}
        variant="contained"
        onClick={handleClickOpenCreateModal}
      >
        Adicionar Produto
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
                  maxWidth: '8rem',
                }}
              >
                Descrição
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  maxWidth: '2rem',
                }}
              >
                Preço Original
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  maxWidth: '2rem',
                }}
              >
                Oferta
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  maxWidth: '2rem',
                }}
              >
                Preço com Desconto
              </StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <StyledTableRow key={row.name}>
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
                  {formatCurrency(row.price)}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: '2rem',
                  }}
                >
                  {row.offers ? `${row.offers.discount_percent}%` : '-'}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: '2rem',
                  }}
                >
                  {row.offers
                    ? formatCurrency(row.offers.value_with_discount)
                    : '-'}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: 4,
                  }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleClickOpenEditModal(row)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
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

      <ProductModalForm
        title="Adicionar Produto"
        buttonText="Adicionar"
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        handleEvent={handleAddProduct}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
      />

      <ProductModalForm
        title="Editar Produto"
        buttonText="Editar"
        open={openEditModal}
        handleClose={handleCloseEditModal}
        handleEvent={handleEditProduct}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
      />
    </Container>
  )
}
