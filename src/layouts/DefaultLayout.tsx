import { Container } from '@mui/material'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'

export const DefaultLayout = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        margin: 0,
        padding: 0,
        '@media (min-width: 600px)': {
          padding: 0,
        },
      }}
    >
      <Header />
      <Outlet />
    </Container>
  )
}
