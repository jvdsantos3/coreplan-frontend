import {
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
import { Delete, Edit } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/currency'

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

export const ProductsTable = () => {
  const { products } = useProduct()

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
                  {row.offer?.discount_percent
                    ? `${row.offer.discount_percent}%`
                    : '-'}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: '2rem',
                  }}
                >
                  {row.offer?.value_with_dicount
                    ? formatCurrency(row.offer.value_with_dicount)
                    : '-'}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: 4,
                  }}
                >
                  <IconButton aria-label="delete">
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
    </Container>
  )
}
