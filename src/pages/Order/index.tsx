import { Box, Button, Container, Typography } from '@mui/material'
import { useProduct } from '../../hooks/useProducts'
import { CartItem } from '../../components/CartItem'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

export const Order = () => {
  const { cartItems } = useProduct()

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
          Carinho
        </Typography>

        {cartItems.length ? (
          <>
            <Box
              sx={{
                maxHeight: 526,
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
              {cartItems.map((item) => (
                <Fragment key={item.id}>
                  <CartItem item={item} />
                </Fragment>
              ))}
            </Box>

            <Button variant="contained">Finalizar Pedido</Button>
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
              Seu carrinho está vazio.
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
