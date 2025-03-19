import logo from '../../assets/logo.png'
import { Header } from '../components'
import { Box } from '@mui/material'

interface ILogedLayoutProps {
  children: React.ReactNode
}

export const LogedLayout: React.FC<ILogedLayoutProps> = ({ children }) => {
  const navItems = [
    {
      label: 'My links',
      path: '/links'
    },
    {
      label: 'Contact',
      path: '/contact'
    }
  ]

  return (
    <>
      <Header navItems={navItems} logo={logo} />
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 135px)',
          pb: 12.25,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto'
        }}
      >
        {children}
      </Box>
    </>
  )
}
