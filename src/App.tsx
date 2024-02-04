import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { theme } from './styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import { ThemeProvider } from '@mui/material'
import { GlobalStyle } from './styles/Global'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  )
}
