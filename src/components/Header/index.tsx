import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import {
  AccountCircle,
  ShoppingCart,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { Badge, Button } from '@mui/material'
import { useProduct } from '../../hooks/useProducts'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const { cartLength } = useProduct()
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to={Number(user?.role) === 1 ? '/admin' : '/home'}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Loja Coreplan
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  component={NavLink}
                  to={Number(user?.role) === 1 ? '/admin/produtos' : '/home'}
                  textAlign="center"
                >
                  Produtos
                </Typography>
              </MenuItem>
              {Number(user?.role) === 1 && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    component={NavLink}
                    to="/admin/ofertas"
                    textAlign="center"
                  >
                    Ofertas
                  </Typography>
                </MenuItem>
              )}
              {Number(user?.role) === 1 && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    component={NavLink}
                    to="/admin/pedidos"
                    textAlign="center"
                  >
                    Pedidos
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to={Number(user?.role) === 1 ? '/admin' : '/home'}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Loja Coreplan
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={NavLink}
              to={Number(user?.role) === 1 ? '/admin/produtos' : '/home'}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Produtos
            </Button>
            {Number(user?.role) === 1 && (
              <>
                <Button
                  component={NavLink}
                  to="/admin/ofertas"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Ofertas
                </Button>
                <Button
                  component={NavLink}
                  to="/admin/pedidos"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Pedidos
                </Button>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {Number(user?.role) !== 1 && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Carrinho">
                  <IconButton
                    component={NavLink}
                    to="/carrinho"
                    size="large"
                    color="inherit"
                    sx={{ p: 0 }}
                  >
                    <Badge badgeContent={cartLength} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
            )}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir opções de perfil">
                <IconButton
                  onClick={handleOpenUserMenu}
                  size="large"
                  color="inherit"
                  sx={{ p: 0 }}
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {Number(user?.role) !== 1 && (
                  <MenuItem onClick={() => navigate('/pedidos')}>
                    Meus pedidos
                  </MenuItem>
                )}
                <MenuItem onClick={logout}>Sair</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
