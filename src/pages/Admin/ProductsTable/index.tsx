import {
  Box,
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
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from '@mui/material'
import { useProduct } from '../../../hooks/useProducts'
import { AddCircleOutline, Delete, Edit, Close } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/currency'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const formSchema = z.object({
  name: z.string().min(1, 'O campo Usuário é obrigatório.'),
  description: z.string().min(1, 'O campo Senha é obrigatório.'),
  price: z.coerce.number(),
})

export type FormInputs = z.infer<typeof formSchema>

export const ProductsTable = () => {
  const [open, setOpen] = useState(false)

  const { products, addProduct, deleteProduct } = useProduct()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  })

  const handleAddProduct = (data: FormInputs) => {
    addProduct(data)
    handleClose()
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
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
        onClick={handleClickOpen}
      >
        Adicionar Produto
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(handleAddProduct)}
          sx={{
            width: 600,
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Adicionar Produto
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          <DialogContent dividers>
            <TextField
              margin="normal"
              fullWidth
              required
              id="name"
              label="Nome"
              autoFocus
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : null}
              {...register('name')}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="description"
              label="Descrição"
              autoFocus
              error={!!errors.description}
              helperText={
                errors.description ? errors.description.message : null
              }
              {...register('description')}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="price"
              label="Preço"
              autoFocus
              type="number"
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : null}
              {...register('price')}
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              sx={{
                color: ({ palette }) => palette.error.main,
              }}
            >
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              Adicionar
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>

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
                  <IconButton aria-label="edit">
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteProduct(row)}
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
    </Container>
  )
}
