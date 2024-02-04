import { Link, Typography } from '@mui/material'
import { TypographyProps } from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'

export const Copyright = (props: TypographyProps) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright ©'}
      <Link component={NavLink} color="inherit" to="/home">
        Coreplan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
