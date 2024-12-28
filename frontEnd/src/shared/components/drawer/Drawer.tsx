import { NavLinkItem } from '..'
import {
  Drawer as MUIDrawer,
  ListItemButton,
  ListItemText,
  IconButton,
  ListItem,
  Divider,
  Button,
  List,
  Icon,
  Box
} from '@mui/material'

type TNavItem = {
  label: string
  path: string
}

interface IDrawerProps {
  isDrawerOpen: boolean
  logo: string
  navItems: TNavItem[]
  handleClickInLogo: () => void
  handleDrawerToggle: () => void
}

export const Drawer: React.FC<IDrawerProps> = ({
  isDrawerOpen,
  logo,
  navItems,
  handleClickInLogo,
  handleDrawerToggle
}) => {
  return (
    <MUIDrawer
      component="nav"
      variant="temporary"
      anchor="top"
      open={isDrawerOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true
      }}
      sx={{
        'display': { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', height: '60%' }
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pb: 4
        }}
      >
        <Box>
          <Box height={90}>
            <Box
              onClick={handleClickInLogo}
              component="img"
              src={logo}
              alt="logo"
              sx={{ width: 90, height: 90, cursor: 'pointer' }}
            ></Box>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ position: 'absolute', right: 14, top: 16 }}
            >
              <Icon fontSize="large" color="primary">
                close
              </Icon>
            </IconButton>
          </Box>
          <Divider
            sx={theme => ({ bgcolor: theme.palette.background.default })}
          />
          <List>
            {navItems.map(item => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton sx={{ textAlign: 'center', p: 0 }}>
                  <ListItemText
                    primary={
                      <NavLinkItem
                        label={item.label}
                        to={item.path}
                        isDrawerOpen={true}
                        onClick={handleDrawerToggle}
                      />
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            onClick={handleDrawerToggle}
            variant="contained"
            sx={{ width: '80%', borderRadius: 2.5, p: 2 }}
          >
            logout
          </Button>
        </Box>
      </Box>
    </MUIDrawer>
  )
}
