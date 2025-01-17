import { Box, LinearProgress } from '@mui/material'
import logo from '../../assets/logo.png'

export const LoadingPage = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="logo"
        sx={theme => ({
          width: 250,
          height: 250,
          [theme.breakpoints.down('sm')]: {
            width: 200,
            height: 200
          }
        })}
      />
      <Box
        sx={theme => ({
          bgcolor: theme.palette.background.paper,
          p: 3,
          borderRadius: 2,
          [theme.breakpoints.down('sm')]: {
            p: 2
          }
        })}
      >
        <LinearProgress
          variant="indeterminate"
          color="primary"
          sx={theme => ({
            width: 300,
            borderRadius: 10,
            [theme.breakpoints.down('sm')]: {
              width: 150
            }
          })}
        />
      </Box>
    </Box>
  )
}
