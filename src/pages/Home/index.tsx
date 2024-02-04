import { Box, Container, Grid, Typography } from '@mui/material'
import { ProductCard } from '../../components/ProductsCard'
import { IProduct } from '../../interfaces/IProduct'
import { useProduct } from '../../hooks/useProducts'

export const Home = () => {
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

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {products.length ? (
          <Grid container spacing={2}>
            {products.map((product: IProduct) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={product.id}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  offers={product.offers}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: 18, fontWeight: 'bold' }}
            >
              Nenhum produto encontrado.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  )
}
