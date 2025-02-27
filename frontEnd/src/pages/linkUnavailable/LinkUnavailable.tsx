import { Box, Typography } from '@mui/material'

export const LinkUnavailable = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        px: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
      }}
    >
      <Box
        component="img"
        width="100"
        height="100"
        src="https://img.icons8.com/257FFF/wired/100/broken-link.png"
        alt="broken-link"
      />
      <Typography variant="h4" textAlign="center">
        This link isn't availabled
      </Typography>
      <Typography variant="subtitle1" textAlign="center" maxWidth={625}>
        This link is currently inactive. It may be disabled or its access period
        has expired. Please contact the administrator or try again later.
      </Typography>
    </Box>
  )
}
