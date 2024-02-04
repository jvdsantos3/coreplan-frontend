import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Copyright } from '../Copyright'
import { NavLink } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface LoginProps {
  title: string
  buttonText: string
  linkText: string
  linkPath: string
}

const formSchema = z.object({
  user: z.string().min(1, 'O campo Usuário é obrigatório.'),
  password: z.string().min(1, 'O campo Senha é obrigatório.'),
})

export type FormInputs = z.infer<typeof formSchema>

export const UserForm = ({
  title,
  buttonText,
  linkText,
  linkPath,
}: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = () => {}

  const handleEvent = (data: FormInputs) => {
    console.log({
      email: data.user,
      password: data.password,
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {title}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(handleEvent)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            required
            id="user"
            label="Usuário"
            autoFocus
            error={!!errors.user}
            helperText={errors.user ? errors.user.message : null}
            {...register('user')}
          />
          <FormControl
            sx={{ mt: 1 }}
            variant="outlined"
            fullWidth
            required
            error={!!errors.password}
          >
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
              {...register('password')}
            />
            <FormHelperText>{errors.password?.message}</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {buttonText}
          </Button>

          <Link
            component={NavLink}
            to={linkPath}
            variant="body2"
            underline="hover"
          >
            {linkText}
          </Link>
        </Box>
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
