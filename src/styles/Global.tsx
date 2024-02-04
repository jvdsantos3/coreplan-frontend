import { CssBaseline, GlobalStyles } from '@mui/material'

export const GlobalStyle = () => (
  <>
    <CssBaseline />

    <GlobalStyles
      styles={({ palette }) => ({
        html: {
          margin: 0,
          padding: 0,
        },
        body: {
          margin: 0,
          padding: 0,
          '&::-webkit-scrollbar': {
            width: '0.5rem',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: palette.primary.light,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: palette.secondary.dark,
          },
        },
      })}
    />
  </>
)
