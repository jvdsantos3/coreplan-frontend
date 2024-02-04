import { UserForm } from '../../components/UserForm'

export const Login = () => {
  return (
    <UserForm
      title="Login"
      buttonText="Entrar"
      linkText="Ainda não tem uma conta? Cadastre-se"
      linkPath="/register"
    />
  )
}
