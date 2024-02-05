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
} from '@mui/material'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export const OfferModalForm = ({
  title,
  buttonText,
  open,
  handleClose,
  handleEvent,
  handleSubmit,
  handleChange,
  register,
  errors,
  products,
  productId,
}) => {
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
              pattern: '^[0-9]{1,2}$', // Aceita de 1 a 2 dígitos numéricos
              maxLength: 2, // Define o comprimento máximo como 2
            }}
            {...register('discount_percent')}
          />
          <InputLabel id="product_id_label">Alvo</InputLabel>
          <Select
            margin="normal"
            fullWidth
            value={productId}
            label="Alvo"
            onChange={handleChange}
            id="product_id"
            error={!!errors.product_id}
            helperText={errors.product_id ? errors.product_id.message : null}
            {...register('product_id')}
          >
            <MenuItem key={0} value={0}>
              Geral
            </MenuItem>
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
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
