import { Box, Typography } from '@mui/material'
import logo from '../../assets/logo.png'
import { TextLink } from '../components'

interface IAuthLayout {
  children: React.ReactNode
}

export const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <Box
      sx={theme => ({
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        pb: 10,
        [theme.breakpoints.down('sm')]: {
          justifyContent: 'flex-start'
        }
      })}
    >
      <Box
        component="img"
        src={logo}
        alt="logo"
        sx={{ width: 120, height: 120 }}
      />
      <Box
        sx={theme => ({
          bgcolor: theme.palette.background.paper,
          borderRadius: 10,
          width: 550,
          maxheight: '45%',
          [theme.breakpoints.down('sm')]: {
            bgcolor: 'transparent',
            width: '100%',
            mt: -5,
            padding: 1
          }
        })}
      >
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          position: 'absolute',
          bottom: 10
        }}
      >
        <Typography
          sx={{ color: 'rgba(255, 255, 255, 0.75)', textAlign: 'center' }}
        >
          {'\u00A9'} {new Date().getFullYear()} LinkIt.
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.75)',
            px: 1,
            textAlign: 'center'
          }}
        >
          <TextLink
            target="_blank"
            href="https://www.gnu.org/licenses/agpl-3.0.html"
          >
            GNU Affero General Public License v3.0
          </TextLink>
          . The source code is available on{' '}
          <TextLink target="_blank" href="https://github.com/MawmartA7/LinkIt">
            GitHub
          </TextLink>
        </Typography>
      </Box>
    </Box>
  )
}
