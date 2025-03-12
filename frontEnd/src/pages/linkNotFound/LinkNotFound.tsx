import { Box, Typography } from '@mui/material'

export const LinkNotFound = () => {
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
      <Typography
        variant="h1"
        textAlign="center"
        fontWeight={400}
        color="primary"
      >
        404
      </Typography>
      <Typography variant="h4" textAlign="center">
        Link not found
      </Typography>
      <Typography variant="subtitle1" textAlign="center" maxWidth={625}>
        If you are sure that this link exists or has existed, try again or
        contact the link administrator.
      </Typography>
    </Box>
  )
}
