import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { formatCurrency } from '../../utils/currency'
import { useState } from 'react'
import { CountButtons } from '../CountButtons'
import { ICartItem } from '../../interfaces/ICartItem'
import { useProduct } from '../../hooks/useProducts'
import { Delete } from '@mui/icons-material'

interface CartItemProps {
  item: ICartItem
}

export const CartItem = ({ item }: CartItemProps) => {
  const [count, setCount] = useState(item.quantity)

  const { changeCartItemQuantity, removeFromCart } = useProduct()

  const handleChangeCount = (value: number) => {
    changeCartItemQuantity(item.id, value)
    setCount(value)
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <Card
      variant="outlined"
      sx={{
        minHeight: 96,
      }}
    >
      <CardContent
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1" color="text.secondary">
          {item.name}
        </Typography>

        {item.offer === null ? (
          <Typography
            variant="body1"
            color="success.light"
            sx={{
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {formatCurrency(item.price)}
          </Typography>
        ) : (
          <Box>
            <Typography
              variant="body1"
              color="success.light"
              sx={{
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              {item.offer && formatCurrency(item.offer.value_with_dicount)}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: 12,
                  textDecoration: 'line-through',
                }}
              >
                {formatCurrency(item.price)}
              </Typography>
              <Typography variant="body1">-</Typography>
              <Typography
                variant="body1"
                color="error.light"
                sx={{
                  fontSize: 12,
                }}
              >
                {item.offer && item.offer.discount_percent}% OFF
              </Typography>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CountButtons count={count} handleChange={handleChangeCount} />
          <Button
            variant="outlined"
            startIcon={<Delete />}
            color="error"
            onClick={handleRemove}
          >
            Remover
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
