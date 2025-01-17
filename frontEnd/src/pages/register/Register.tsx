import { useState } from 'react'
import { TextLink } from '../../shared/components/textLink/TextLink'
import { VTextField } from '../../shared/components'
import { useVForm, VForm } from '../../shared/forms'
import {
  SnackbarCloseReason,
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

export const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const { formRef, save } = useVForm()

  const handleRegister = (data: IRegisterData) => {
    console.log(data)
    setErrorMessage('Complete all fields')
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
        <VTextField
          variant="custumOutlined"
          name="confirmPassword"
          label="Confirm password"
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
          Register
        </Button>
        <Typography variant="body1" color="primary" textAlign="center">
          You already have an account? <TextLink href="/login">Login</TextLink>
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
