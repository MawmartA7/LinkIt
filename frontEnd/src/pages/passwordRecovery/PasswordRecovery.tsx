import { useState } from 'react'
import { AuthService } from '../../shared/services/AuthService'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TextLink, VTextField } from '../../shared/components'
import { useVForm, VForm } from '../../shared/forms'
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

interface IPasswordRecovery {
  newPassword: string
  confirmNewPassword: string
}

export const PasswordRecovery = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token')

  const navigate = useNavigate()
  const { formRef, save } = useVForm()

  if (!token) navigate('/')

  const handlePasswordRecovery = async (data: IPasswordRecovery) => {
    setIsLoading(true)

    try {
      if (!token) {
        setErrorMessage('Token not found')
        return
      }

      if (!data.newPassword) {
        setErrorMessage('These fields are required.')
        formRef.current?.setErrors({
          newPassword: 'These fields are required.',
          confirmNewPassword: 'These fields are required.'
        })
        return
      }
      if (data.newPassword !== data.confirmNewPassword) {
        setErrorMessage('The password confirmation must match the password.')
        formRef.current?.setErrors({
          confirmPassword: 'The password confirmation must match the password.'
        })
        return
      }

      if (data.newPassword.length < 5) {
        setErrorMessage('The new password must be at least 5 chars.')
        formRef.current?.setErrors({
          newPassword: 'The new password must be at least 5 chars.'
        })
        return
      }
      const result = await AuthService.PasswordRecovery(token, data.newPassword)

      if (result === 'success') {
        navigate('/login')
        return
      }

      setErrorMessage('An error occurred')
    } catch (error) {
      setErrorMessage('An error occurred')
      console.error(error)
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
    <VForm
      ref={formRef}
      onSubmit={(data: IPasswordRecovery) => {
        handlePasswordRecovery(data)
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
        <Typography
          width="100%"
          variant="h5"
          color="primary"
          fontWeight={500}
          mb={1}
        >
          Reset password
        </Typography>
        <VTextField
          variant="custumOutlined"
          name="newPassword"
          label="New password"
          placeholder="•••••"
          disabled={isLoading}
          type={isPasswordVisible ? 'text' : 'password'}
          endAdornment={
            <IconButton onClick={() => setIsPasswordVisible(old => !old)}>
              <Icon
                sx={theme => ({
                  'color': '#c5cad3',
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
          name="confirmNewPassword"
          label="Confirm password"
          placeholder="•••••"
          disabled={isLoading}
          type={isPasswordVisible ? 'text' : 'password'}
          endAdornment={
            <IconButton onClick={() => setIsPasswordVisible(old => !old)}>
              <Icon
                sx={theme => ({
                  'color': '#c5cad3',
                  '&:hover': { color: theme.palette.secondary.main }
                })}
              >
                {isPasswordVisible ? 'visibility_off' : 'visibility'}
              </Icon>
            </IconButton>
          }
        />
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
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
            {isLoading ? <CircularProgress size={24} /> : 'Reset'}
          </Button>
          <TextLink href="/login" style={{ textDecoration: 'none' }}>
            <Typography display="flex" color="secondary">
              <Icon fontSize="small">arrow_back</Icon>Back to login
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
    </VForm>
  )
}
