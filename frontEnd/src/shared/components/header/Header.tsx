import { useCallback, useState } from 'react'

import { NavLinkItem } from '../navLinkItem/NavLinkItem'
import { useNavigate } from 'react-router-dom'
import { Drawer } from '../drawer/Drawer'
import {
  IconButton,
  Typography,
  Toolbar,
  Button,
  AppBar,
  Icon,
  Box
} from '@mui/material'

type TNavItem = {
  label: string
  path: string
}

interface IHeaderProps {
  navItems: TNavItem[]
  logo: string
}

export const Header: React.FC<IHeaderProps> = ({ navItems, logo }) => {
  const navigate = useNavigate()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleDrawerToggle = useCallback(() => {
    setIsDrawerOpen(oldIsDrawerOpen => !oldIsDrawerOpen)
  }, [])

  const handleClickInLogo = useCallback(() => {
    navigate('/')
    handleDrawerToggle()
  }, [handleDrawerToggle, navigate])

  return (
    <>
      <AppBar
        component="header"
        sx={theme => ({
          paddingRight: { sm: 1, md: 5 },
          paddingLeft: { sm: 1, md: 5 },
          backgroundColor: theme.palette.background.paper
        })}
      >
        <Toolbar component="nav">
          <Box
            onClick={() => navigate('/')}
            component="img"
            src={logo}
            alt="logo"
            sx={{ width: 90, height: 90, cursor: 'pointer' }}
          ></Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
          >
            <IconButton
              color="primary"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <Icon fontSize="large">menu</Icon>
            </IconButton>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex', alignItems: 'center' }
              }}
            >
              {navItems.map(item => (
                <Button
                  key={item.path}
                  sx={{ textTransform: 'none', height: '70%' }}
                >
                  <NavLinkItem
                    label={item.label}
                    to={item.path}
                    isDrawerOpen={false}
                  />
                </Button>
              ))}
              <Button sx={{ textTransform: 'none', height: '70%' }}>
                <Typography color="primary" fontWeight={500}>
                  logout
                </Typography>
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        logo={logo}
        navItems={navItems}
        handleClickInLogo={handleClickInLogo}
        handleDrawerToggle={handleDrawerToggle}
      />
    </>
  )
}
