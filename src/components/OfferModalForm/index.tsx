import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  styled,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { IProduct } from '../../interfaces/IProduct'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

interface OfferModalForm {
  title: string
  buttonText: string
  open: boolean
  handleClose: () => void
  handleEvent: any
  handleSubmit: any
  register: any
  errors: any
  products: IProduct[]
  setValue: any
}

export const OfferModalForm = ({
  title,
  buttonText,
  open,
  handleClose,
  handleEvent,
  handleSubmit,
  register,
  errors,
  products,
  setValue,
}: OfferModalForm) => {
  const handleInput = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos
    setValue('discount_percent', value)
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleEvent)}
        sx={{
          width: 600,
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
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
            helperText={errors.description ? errors.description.message : null}
            {...register('description')}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="discount_percent"
            label="Porcentagem"
            autoFocus
            error={!!errors.discount_percent}
            helperText={
              errors.discount_percent ? errors.discount_percent.message : null
            }
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 2,
            }}
            {...register('discount_percent')}
            onInput={handleInput}
          />
          <FormControl fullWidth>
            <InputLabel id="select-label">Alvo</InputLabel>
            <Select
              labelId="select-label"
              input={<OutlinedInput label="Alvo" />}
              id="select"
              {...register('product_id')}
              error={!!errors.product_id}
            >
              <MenuItem key={0} value={0}>
                Geral
              </MenuItem>
              {products.map((product: IProduct) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
            {errors.product_id && <span>{errors.product_id.message}</span>}
          </FormControl>
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
            {buttonText}
          </Button>
        </DialogActions>
      </Box>
    </BootstrapDialog>
  )
}
