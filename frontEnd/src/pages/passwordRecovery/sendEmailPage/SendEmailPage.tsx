import { useState } from 'react'
import { AuthService } from '../../../shared/services/AuthService'
import { authSchemas } from '../../../shared/forms/schemas'
import { useNavigate } from 'react-router-dom'
import {
  TextFieldCustumOutlined,
  EmailConfirmation,
  TextLink
} from '../../../shared/components'
import * as yup from 'yup'
import {
  SnackbarCloseReason,
  CircularProgress,
  Typography,
  Snackbar,
  Button,
  Alert,
  Icon,
  Box
} from '@mui/material'

export const SendEmailPage = () => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [isInEmailConfirmation, setIsInEmailConfirmation] = useState(false)
  const [codeErrorMessage, setCodeErrorMessage] = useState<string>()

  const navigate = useNavigate()

  const handleSendEmail = async () => {
    setIsLoading(true)
    try {
      const validatedEmail = await authSchemas.emailIsValid
        .required()
        .validate(email)

      const result = await AuthService.sendPasswordRecoveryEmail(validatedEmail)

      if (result === 'success') {
        setIsInEmailConfirmation(true)
      }
      setErrorMessage('Invalid email')
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrorMessage(error.message)
      }

      setErrorMessage('Invalid email')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmCode = async (code: number) => {
    try {
      const token = await AuthService.confirmRecoveryCode(`${code}`)

      if (token instanceof Error) {
        setCodeErrorMessage('Invalid code')
        return
      }

      navigate('/password-recovery?token=' + token)
    } catch (error) {
      setCodeErrorMessage('Invalid code')
      console.error(error)
    }
  }

  const handleCloseSnackBar = (reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    setErrorMessage(undefined)
  }

  return !isInEmailConfirmation ? (
    <Box>
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
        <Typography width="100%" variant="h5" color="primary" fontWeight={500}>
          Recovery your password
        </Typography>
        <Typography mb={2}>
          Enter your email address and we will send you a password recovery
          link.
        </Typography>
        <Box
          sx={theme => ({
            width: '100%',
            height: 50,
            px: 5,
            [theme.breakpoints.down(400)]: {
              px: 0
            }
          })}
        >
          <TextFieldCustumOutlined
            inputType="text"
            defaultValue=""
            value={email}
            setValue={setEmail}
            error={!!errorMessage}
            clearError={() => {
              setErrorMessage(undefined)
            }}
            disabled={isLoading}
            placeholder="example@email.com"
            style={{ width: '100%' }}
          />
        </Box>
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
          onClick={handleSendEmail}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Send email'}
        </Button>
        <TextLink href="/login" style={{ textDecoration: 'none' }}>
          <Typography display="flex" color="secondary">
            <Icon fontSize="small">arrow_back</Icon>Back
          </Typography>
        </TextLink>
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
    </Box>
  ) : (
    <EmailConfirmation
      email={email}
      goBack={() => setIsInEmailConfirmation(false)}
      handleConfirmCode={handleConfirmCode}
      reSendCode={handleSendEmail}
      errorMessage={codeErrorMessage}
      clearError={() => setCodeErrorMessage(undefined)}
    />
  )
}
