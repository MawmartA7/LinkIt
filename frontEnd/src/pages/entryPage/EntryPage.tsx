import {
  Box,
  Button,
  Grid2 as Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useCallback } from 'react'
import { useAuthContext } from '../../shared/contexts'

export const EntryPage = () => {
  const theme = useTheme()

  const { login } = useAuthContext()

  const smDown: boolean = useMediaQuery(theme.breakpoints.down('sm'))

  const handleRegiste = useCallback(() => {}, [])

  const handleLogin = useCallback(() => {
    login('aaronstewartmartinez@hotmail.com', 'password')
  }, [login])

  return (
    <Grid container direction="column" height="100%" overflow="hidden">
      <Grid height="100%" size={{ sm: 12, md: 5 }}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: smDown ? 'flex-start' : 'center',
            gap: 2,
            px: smDown ? 0 : 10,
            p: smDown ? 2 : undefined
          }}
        >
          <Typography variant={'h4'} color="primary" fontWeight={500}>
            Shorten your links/urls with linkIt
          </Typography>
          <Typography variant="body1">
            Shorten your links and share them more easily. Turn long and
            complicated URLs into short, memorable links. Perfect for sharing on
            social media, emails, and messages. Simplify now!
          </Typography>
          <Box display="flex" mt={1} gap={2}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ textTransform: 'none' }}
              onClick={handleRegiste}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={handleLogin}
              sx={{ textTransform: 'none' }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid size={{ sm: 0, md: 7 }}>
        <Box
          component="img"
          src="./hero-image-person-holding-phone.jpg"
          alt="A man with a cell phone in his hand"
          sx={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            maxWidth: '100%',
            maxHeight: '100vh'
          }}
        ></Box>
      </Grid>
    </Grid>
  )
}
