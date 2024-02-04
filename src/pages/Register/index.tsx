import { UserForm } from '../../components/UserForm'

export const Register = () => {
  return (
    <UserForm
      title="Cadastro"
      buttonText="Cadastrar"
      linkText="Já tem uma conta? Faça o login."
      linkPath="/"
    />
  )
}
