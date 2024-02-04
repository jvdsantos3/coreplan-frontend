import { Box, Button, Container, Typography } from '@mui/material'
import { Header } from '../../components/Header'
import { useProduct } from '../../hooks/useProducts'
import { CartItem } from '../../components/CartItem'
import { Fragment } from 'react'

export const Cart = () => {
  const { cartItems } = useProduct()

  return (
    <Container
      maxWidth={false}
      sx={{
        margin: 0,
        padding: 0,
        '@media (min-width: 600px)': {
          padding: 0,
        },
      }}
    >
      <Header />

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
        </Box>
      </Container>
    </Container>
  )
}
