import { useState } from 'react'
import { TextLink } from '../../shared/components/textLink/TextLink'
import { authSchemas } from '../../shared/forms/schemas'
import { useAuthContext } from '../../shared/contexts'
import { VTextField } from '../../shared/components'
import { useVForm, VForm } from '../../shared/forms'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {
  SnackbarCloseReason,
  CircularProgress,
  IconButton,
  Typography,
  Snackbar,
  Button,
  Alert,
  Icon,
  Box
} from '@mui/material'
import { UseRecaptcha } from '../../shared/hooks/UseRecaptcha'

interface ILoginData {
  email: string
  password: string
}

export const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const { formRef, save } = useVForm()
  const { executeRecaptcha } = UseRecaptcha()

  const { login, isCheckingAuth } = useAuthContext()

  const navigate = useNavigate()

  const handleLogin = async (data: ILoginData) => {
    try {
      const validatedData = await authSchemas.authValidationSchema.validate(
        data,
        {
          abortEarly: false
        }
      )

      const recaptchaToken = await executeRecaptcha('login')

      if (!recaptchaToken) {
        throw new Error('Recaptcha token is empty')
      }

      const response = await login(
        validatedData.email,
        validatedData.password,
        recaptchaToken
      )

      if (response === 'success') {
        navigate('/')
        return
      }

      throw response
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {}

        error.inner.forEach(error => {
          if (!error.path) return
          validationErrors[error.path] = error.message
        })
        formRef.current?.setErrors(validationErrors)
        setErrorMessage('The data should be valid')
        return
      }
      if ((error as Error).message === 'Automated behavior detected.') {
        setErrorMessage('Automated behavior detected.')
        return
      }
      setErrorMessage('Authentication error')
    }
  }

  const handleCloseSnackBar = (reason?: SnackbarCloseReason) => {
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
          disabled={isCheckingAuth}
        />
        <VTextField
          variant="custumOutlined"
          name="password"
          label="Password"
          placeholder="•••••"
          disabled={isCheckingAuth}
          type={isPasswordVisible ? 'text' : 'password'}
          endAdornment={
            <IconButton onClick={() => setIsPasswordVisible(old => !old)}>
              <Icon
                sx={theme => ({
                  'color': isCheckingAuth
                    ? theme.palette.action.disabled
                    : '#c5cad3',
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
          disabled={isCheckingAuth}
          fullWidth
          sx={theme => ({
            mt: 1,
            color: theme.palette.primary.contrastText,
            textTransform: 'none',
            borderRadius: 2.5
          })}
          onClick={save}
        >
          {isCheckingAuth ? <CircularProgress size={24} /> : 'Login'}
        </Button>
        <Typography variant="body1" color="primary" textAlign="center">
          No have an account? <TextLink href="/register">Register</TextLink>
        </Typography>
        <Typography variant="body1" color="primary" textAlign="center">
          Forgot your password?{' '}
          <TextLink href="/password-recovery/send-email">
            Password Recovery
          </TextLink>
        </Typography>
      </Box>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={10000}
        onClose={(_, reason) => handleCloseSnackBar(reason)}
        sx={{
          position: 'absolute',
          width: 260
        }}
      >
        <Alert
          onClose={() => handleCloseSnackBar()}
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
