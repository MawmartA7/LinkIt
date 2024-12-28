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
      <Box component="main" pt={11.25}>
        {children}
      </Box>
    </>
  )
}
