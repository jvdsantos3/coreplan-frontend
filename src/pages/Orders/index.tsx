import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'
import { useProduct } from '../../hooks/useProducts'
import { NavLink } from 'react-router-dom'
import { ExpandMore } from '@mui/icons-material'
import { Fragment } from 'react'
import moment from 'moment'
import { formatCurrency } from '../../utils/currency'

export const Order = () => {
  const { orders } = useProduct()

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingY: 4,
        display: 'flex',
        gap: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          background: ({ palette }) => palette.secondary.main,
          borderRadius: '4px',
          padding: 4,

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
          Pedidos
        </Typography>

        {orders.length ? (
          <>
            <Box
              sx={{
                maxHeight: 650,
                paddingRight: 0.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '0.5rem',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: ({ palette }) => palette.primary.light,
                  borderRadius: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: ({ palette }) => palette.secondary.dark,
                },
              }}
            >
              {orders.map((item) => (
                <Accordion key={item.order.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Fragment>{`Pedido #${item.order.order_id}`}</Fragment>
                    <Fragment> - </Fragment>
                    <Fragment>{`${moment(new Date(item.order.created_at)).format('DD/MM/YYYY HH:mm')}`}</Fragment>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="h6">Pedidos</Typography>
                    <Box>
                      {item.order_items.map((product, index) => (
                        <Typography
                          key={index}
                        >{`- Item: ${product.name} - Preço: ${formatCurrency(product.price_with_discount)} x${product.quantity}`}</Typography>
                      ))}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        marginTop: 1,
                      }}
                    >
                      Total:{' '}
                      {formatCurrency(item.order.total_value_with_discounts)}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </>
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: 20, fontWeight: 'bold' }}
            >
              Você ainda não fez nenhum pedido.
            </Typography>
            <Button
              component={NavLink}
              to="/home"
              variant="contained"
              size="large"
            >
              Voltar
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  )
}
