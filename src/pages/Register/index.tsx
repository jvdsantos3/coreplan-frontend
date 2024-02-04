import { UserForm } from '../../components/UserForm'
import { useAuth } from '../../hooks/useAuth'
import { LoginInput } from '../../interfaces/IUserInput'

export const Register = () => {
  const { register } = useAuth()

  const handleRegister = async (data: LoginInput) => {
    await register(data)
  }

  return (
    <UserForm
      title="Cadastro"
      buttonText="Cadastrar"
      buttonTextLoading="Cadastrando..."
      linkText="Já tem uma conta? Faça o login."
      linkPath="/"
      handleEvent={handleRegister}
    />
  )
}
