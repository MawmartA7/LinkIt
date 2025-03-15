import { useEffect, useState } from 'react'
import { useVForm, VForm } from '../../forms'
import { VTextField } from '..'
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

interface IEmailConfirmationProps {
  email?: string
  handleConfirmCode: (code: number) => void
  goBack: () => void
  reSendCode: () => void
  errorMessage: string | undefined
  clearError: () => void
}

export const EmailConfirmation: React.FC<IEmailConfirmationProps> = ({
  email,
  handleConfirmCode,
  goBack,
  reSendCode,
  errorMessage,
  clearError
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)

  const { formRef, save } = useVForm()

  useEffect(() => {
    if (timeLeft === 0) return

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const handleCloseSnackBar = (reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    clearError()
  }

  return (
    <VForm
      ref={formRef}
      onSubmit={(data: { code: number }) => {
        setIsLoading(true)
        handleConfirmCode(data.code)
        setIsLoading(false)
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
        <Box width="100%" display="flex" justifyContent="flex-start" mt={-3}>
          <IconButton onClick={goBack}>
            <Icon
              fontSize="medium"
              sx={theme => ({ color: theme.palette.primary.main })}
            >
              arrow_back
            </Icon>
          </IconButton>
        </Box>
        <Typography mb={2} textAlign="center">
          You have received an e-mail at <strong>{email} </strong>
          with a code. Enter the same code below:
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: 50,
            pr: 10
          }}
        >
          <VTextField
            variant="custumOutlined"
            name="code"
            disabled={isLoading}
            inputType="numeric"
            maxLength={5}
            style={{ width: '80%' }}
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
          onClick={save}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Confirm code'}
        </Button>
      </Box>
      <Typography variant="body1" textAlign="center">
        Didn't receive an email? Make sure to check your spam folder or{' '}
        {timeLeft === 0 ? (
          <Button
            onClick={() => {
              reSendCode()
              setTimeLeft(60)
            }}
          >
            send a code.
          </Button>
        ) : (
          <>
            send a code in <strong>{timeLeft}</strong> seconds.
          </>
        )}
      </Typography>

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
