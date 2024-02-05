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
} from '@mui/material'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export const ProductModalForm = ({
  title,
  buttonText,
  open,
  handleClose,
  handleEvent,
  handleSubmit,
  register,
  errors,
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
            id="price"
            label="Preço"
            autoFocus
            error={!!errors.price}
            helperText={errors.price ? errors.price.message : null}
            {...register('price')}
          />
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
