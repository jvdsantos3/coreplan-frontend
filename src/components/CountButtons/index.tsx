import { Add, Remove } from '@mui/icons-material'
import { Button, ButtonGroup } from '@mui/material'

interface CountButtonsProps {
  count: number
  handleChange: (value: number) => void
}

export const CountButtons = ({ count, handleChange }: CountButtonsProps) => {
  return (
    <ButtonGroup>
      <Button
        size="small"
        aria-label="reduce"
        onClick={() => {
          handleChange(Math.max(count - 1, 1))
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
          handleChange(count + 1)
        }}
      >
        <Add fontSize="small" />
      </Button>
    </ButtonGroup>
  )
}
