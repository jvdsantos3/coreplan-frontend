import { UserForm } from '../../components/UserForm'
import { useAuth } from '../../hooks/useAuth'
import { LoginInput } from '../../interfaces/IUserInput'

export const Login = () => {
  const { login } = useAuth()

  const handleLogin = async (data: LoginInput) => {
    await login(data)
  }

  return (
    <UserForm
      title="Login"
      buttonText="Entrar"
      buttonTextLoading="Entrando..."
      linkText="Ainda não tem uma conta? Cadastre-se"
      linkPath="/register"
      handleEvent={handleLogin}
    />
  )
}
