import { useState } from 'react'
import { TextLink } from '../../shared/components/textLink/TextLink'
import { useAuthContext } from '../../shared/contexts'
import { VTextField } from '../../shared/components'
import { useVForm, VForm } from '../../shared/forms'
import { useNavigate } from 'react-router-dom'
import {
  SnackbarCloseReason,
  IconButton,
  Typography,
  Snackbar,
  Button,
  Alert,
  Icon,
  Box
} from '@mui/material'

interface ILoginData {
  email: string
  password: string
}

export const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const { formRef, save } = useVForm()

  const { login } = useAuthContext()

  const navigate = useNavigate()

  const handleLogin = (data: ILoginData) => {
    console.log(data)

    const response = login('aaronstewartmartinez@hotmail.com', 'password')

    if (!response) {
      navigate('/')
      return
    }

    setErrorMessage('Authentication error')
  }

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setErrorMessage(undefined)
  }

  return (
    <VForm
      ref={formRef}
      onSubmit={(data: ILoginData) => {
        handleLogin(data)
      }}
      placeholder={undefined}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <Box
        sx={theme => ({
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
          p: 5,
          [theme.breakpoints.down('sm')]: {
            p: 2.5,
            pt: 5
          }
        })}
      >
        <Typography mb={2} textAlign="center">
          By logging in with an account, you agree to LinkIt's{' '}
          <TextLink href="/terms-of-service">Terms of Service</TextLink>,{' '}
          <TextLink href="/privacy-policy">Privacy Policy</TextLink> and{' '}
          <TextLink href="/acceptable-use-policy">
            Acceptable Use Policy.
          </TextLink>
        </Typography>
        <VTextField
          variant="custumOutlined"
          name="email"
          label="E-mail"
          placeholder="example@email.com"
        />
        <VTextField
          variant="custumOutlined"
          name="password"
          label="Password"
          placeholder="********"
          type={isPasswordVisible ? 'text' : 'password'}
          endAdornment={
            <IconButton onClick={() => setIsPasswordVisible(old => !old)}>
              <Icon
                sx={theme => ({
                  'color': '#c5cad3',
                  'mt': -1,
                  '&:hover': { color: theme.palette.secondary.main }
                })}
              >
                {isPasswordVisible ? 'visibility_off' : 'visibility'}
              </Icon>
            </IconButton>
          }
        />

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={theme => ({
            mt: 1,
            color: theme.palette.primary.contrastText,
            textTransform: 'none',
            borderRadius: 2.5
          })}
          onClick={save}
        >
          Login
        </Button>
        <Typography variant="body1" color="primary" textAlign="center">
          No have an account? <TextLink href="/register">Register</TextLink>
        </Typography>
        <Typography variant="body1" color="primary" textAlign="center">
          Forgot your password?{' '}
          <TextLink href="/password-recovery">Password Recovery</TextLink>
        </Typography>
      </Box>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={10000}
        onClose={handleCloseSnackBar}
        sx={{
          position: 'absolute',
          width: 250
        }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </VForm>
  )
}
