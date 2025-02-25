import { useEffect, useState } from 'react'
import { EmailConfirmation } from './emailConfirmation/EmailConfirmation'
import { TextLink } from '../../shared/components/textLink/TextLink'
import { authValidationSchema } from '../../shared/forms/schemas'
import { AuthService } from '../../shared/services/AuthService'
import { VTextField } from '../../shared/components'
import { useVForm, VForm } from '../../shared/forms'
import * as yup from 'yup'
import {
  SnackbarCloseReason,
  CircularProgress,
  Typography,
  IconButton,
  Snackbar,
  Button,
  Alert,
  Icon,
  Box
} from '@mui/material'

interface IRegisterData {
  email: string
  password: string
  confirmPassword: string
}

interface IUserData {
  email: string
  password: string
}

export const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [isInEmailConfirmation, setIsInEmailConfirmation] = useState(false)
  const [userData, setUserData] = useState<IUserData>()

  const { formRef, isReady, save } = useVForm()

  useEffect(() => {
    if (!isInEmailConfirmation && isReady) {
      formRef.current?.setData({
        email: userData?.email,
        password: userData?.password,
        confirmPassword: userData?.password
      })
    }
  }, [isInEmailConfirmation, isReady])

  const handleRegister = async (data: IRegisterData) => {
    setIsLoading(true)
    try {
      const validatedData = await authValidationSchema.validate(
        { email: data.email, password: data.password },
        {
          abortEarly: false
        }
      )

      if (data.password !== data.confirmPassword) {
        setErrorMessage('The password confirmation must match the password.')
        formRef.current?.setErrors({
          confirmPassword: 'The password confirmation must match the password.'
        })
        return
      }

      const response = await AuthService.register(
        validatedData.email,
        validatedData.password
      )

      console.log(response)

      if (response === 'success') {
        setUserData(validatedData)
        setIsInEmailConfirmation(true)
        return
      }

      if (response.message === 'Request failed with status code 409') {
        setErrorMessage('The email is already in use')
        formRef.current?.setErrors({
          email: 'The email is already in use'
        })
        return
      }

      setErrorMessage('Authentication error')
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {}

        error.inner.forEach(error => {
          if (!error.path) return
          validationErrors[error.path] = error.message
          if (error.path === 'password')
            validationErrors['confirmPassword'] = error.message
        })
        if (data.password !== data.confirmPassword) {
          formRef.current?.setErrors({
            ...validationErrors,
            confirmPassword:
              'The password confirmation must match the password.'
          })
          setErrorMessage('The password confirmation must match the password.')
        } else {
          formRef.current?.setErrors(validationErrors)
          setErrorMessage('The data should be valid')
        }
      } else {
        setErrorMessage('Authentication error')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseSnackBar = (reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    setErrorMessage(undefined)
  }

  return (
    <>
      {!isInEmailConfirmation ? (
        <VForm
          ref={formRef}
          onSubmit={(data: IRegisterData) => {
            handleRegister(data)
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
              By creating an account, you agree to LinkIt's{' '}
              <TextLink href="/terms-of-service">Terms of Service</TextLink>,
              <TextLink href="/privacy-policy"> Privacy Policy</TextLink> and{' '}
              <TextLink href="/acceptable-use-policy">
                Acceptable Use Policy.
              </TextLink>
            </Typography>
            <VTextField
              variant="custumOutlined"
              name="email"
              label="E-mail"
              placeholder="example@email.com"
              disabled={isLoading}
            />
            <VTextField
              variant="custumOutlined"
              name="password"
              label="Password"
              placeholder="•••••"
              disabled={isLoading}
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
            <VTextField
              variant="custumOutlined"
              name="confirmPassword"
              label="Confirm password"
              placeholder="•••••"
              disabled={isLoading}
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
              disabled={isLoading}
              fullWidth
              sx={theme => ({
                mt: 1,
                color: theme.palette.primary.contrastText,
                textTransform: 'none',
                borderRadius: 2.5
              })}
              onClick={save}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
            <Typography variant="body1" color="primary" textAlign="center">
              You already have an account?{' '}
              <TextLink href="/login">Login</TextLink>
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
      ) : (
        <EmailConfirmation
          userData={userData}
          backToRegister={() => setIsInEmailConfirmation(false)}
          reSendCode={() => {
            if (userData)
              handleRegister({
                email: userData.email,
                password: userData.password,
                confirmPassword: userData?.password
              })
          }}
        />
      )}
    </>
  )
}
