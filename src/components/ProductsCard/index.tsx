import { Add, AddShoppingCart, Remove } from '@mui/icons-material'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { formatCurrency } from '../../utils/currency'
import { IProduct } from '../../interfaces/IProduct'
import { useProduct } from '../../hooks/useProducts'

export const ProductCard = (product: IProduct) => {
  const [count, setCount] = useState(1)

  const { name, description, price, offers } = product

  const { addToCart } = useProduct()

  const handleBuy = () => {
    addToCart(product, count)
  }

  return (
    <Card variant="outlined" sx={{ minWidth: 320 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box
          sx={{
            marginTop: 1,

            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {offers === null ? (
            <Typography
              variant="body1"
              color="success.light"
              sx={{
                fontSize: 24,
                fontWeight: 'bold',
              }}
            >
              {formatCurrency(price)}
            </Typography>
          ) : (
            <>
              <Typography
                variant="body1"
                color="success.light"
                sx={{
                  fontSize: 24,
                  fontWeight: 'bold',
                }}
              >
                {offers && formatCurrency(offers.value_with_discount)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                }}
              >
                {formatCurrency(price)}
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
      <CardActions>
        <ButtonGroup>
          <Button
            size="small"
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 1))
            }}
          >
            <Remove fontSize="small" />
          </Button>
          <Button component="span" sx={{ width: '1rem' }}>
            {count}
          </Button>
          <Button
            size="small"
            aria-label="increase"
            onClick={() => {
              setCount(count + 1)
            }}
          >
            <Add fontSize="small" />
          </Button>
        </ButtonGroup>
        <Button
          onClick={handleBuy}
          variant="contained"
          size="large"
          startIcon={<AddShoppingCart />}
          sx={{
            width: '100%',
            lineHeight: 0,
          }}
        >
          Adicionar
        </Button>
      </CardActions>
    </Card>
  )
}
