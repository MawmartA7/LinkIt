import { useState } from 'react'
import { TSubjectValueOptions } from '../../shared/services/ContactService'
import { ContactInfoList, ContactSendEmail } from './components'
import { GitHub, LinkedIn, WhatsApp } from '@mui/icons-material'
import {
  SnackbarCloseReason,
  useMediaQuery,
  IconButton,
  Typography,
  Snackbar,
  Theme,
  Alert,
  Paper,
  Box
} from '@mui/material'

export interface ISubjectOption {
  value: TSubjectValueOptions
  label: string
}

const subjectOptions: ISubjectOption[] = [
  {
    value: 'question',
    label: 'Questions about LinkIt'
  },
  {
    value: 'suggestion',
    label: 'Suggestion for improvement'
  },
  {
    value: 'bug',
    label: 'Report a bug / error'
  },
  {
    value: 'removal',
    label: 'Link removal request'
  },
  {
    value: 'abuse-report',
    label: 'Report abuse or illegal content'
  },
  {
    value: 'other',
    label: 'Other'
  }
]

export const Contact = () => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false)

  const isUpMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const handleCloseSnackBar = (reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    setErrorMessage(undefined)
    setIsSuccessful(false)
  }

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component={Paper}
        sx={theme => ({
          display: 'flex',
          height: 550,
          width: 900,
          bgcolor: 'whitesmoke',
          borderRadius: 5,
          position: 'relative',
          [theme.breakpoints.down('md')]: {
            position: 'absolute',
            top: 90,
            width: '100%',
            minHeight: 'calc(100vh - 90px)',
            bgcolor: 'background.default',
            borderRadius: 0
          },
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: 2.5
          }
        })}
      >
        <Box
          height="100%"
          width={{ xs: '100%', sm: '50%', md: '60%' }}
          p={{ xs: 2, md: 4 }}
        >
          <Typography
            variant={isUpMd ? 'h4' : 'h5'}
            fontWeight={400}
            color="primary.light"
            mb={2}
          >
            Let's get in touch
          </Typography>
          <Typography
            variant="body1"
            color="textPrimary"
            sx={theme => ({
              [theme.breakpoints.down('md')]: {
                color: '#fafafa'
              }
            })}
          >
            Would you like to know more about the project or have your say? Feel
            free to get in touch. The LinkIt is an experimental project, and I'd
            love to hear your suggestions or answer questions!
          </Typography>
          <ContactInfoList isUpMd={isUpMd} />
          <Box
            position={{ xs: 'relative', sm: 'absolute' }}
            mt={2}
            bottom={{ sm: 32 }}
            display="flex"
            gap={1}
          >
            <IconButton
              onClick={() =>
                window.open(
                  'https://wa.me/5521994555856',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
              sx={{
                'borderRadius': 5,
                'color': 'white',
                'bgcolor': 'primary.light',
                '&:hover': {
                  bgcolor: 'primary.main'
                }
              }}
            >
              <WhatsApp fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                window.open(
                  'https://github.com/mawmartA7',
                  '_blank',
                  'noopener,noreferrer'
                )
              }}
              sx={{
                'borderRadius': 5,
                'color': 'white',
                'bgcolor': 'primary.light',
                '&:hover': {
                  bgcolor: 'primary.main'
                }
              }}
            >
              <GitHub fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                window.open(
                  'https://www.linkedin.com/in/aaron-stewart-martinez-972562357/',
                  '_blank',
                  'noopener,noreferrer'
                )
              }}
              sx={{
                'borderRadius': 5,
                'color': 'white',
                'bgcolor': 'primary.light',
                '&:hover': {
                  bgcolor: 'primary.main'
                }
              }}
            >
              <LinkedIn fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={theme => ({
            height: '100%',
            width: '40%',
            position: 'relative',
            bgcolor: theme.palette.background.paper,
            borderTopRightRadius: 17,
            borderBottomRightRadius: 17,
            zIndex: 1102,
            p: 2,
            [theme.breakpoints.down('md')]: {
              width: '50%',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0
            },
            [theme.breakpoints.down('sm')]: {
              width: '100%'
            }
          })}
        >
          <Box
            sx={theme => ({
              position: 'absolute',
              left: -20,
              zIndex: -1,
              width: 40,
              height: 40,
              top: 50,
              rotate: '45deg',
              bgcolor: theme.palette.background.paper,
              [theme.breakpoints.down('sm')]: {
                top: -10,
                left: 'calc(50% - 20px)'
              }
            })}
          />
          <Typography
            color="secondary"
            variant={isUpMd ? 'h4' : 'h5'}
            fontWeight={400}
          >
            Contact us
          </Typography>
          <Typography>
            If you have any questions, suggestions or problems, please fill in
            the form below. We'll get back to you as soon as possible!
          </Typography>
          <ContactSendEmail
            subjectOptions={subjectOptions}
            setErrorMessage={message => setErrorMessage(message)}
            setIsSuccessful={isSuccessful => setIsSuccessful(isSuccessful)}
          />
        </Box>
      </Box>
      <Snackbar
        open={!!errorMessage || isSuccessful}
        autoHideDuration={10000}
        onClose={(_, reason) => handleCloseSnackBar(reason)}
        sx={{
          position: 'fixed',
          width: 260
        }}
      >
        {isSuccessful ? (
          <Alert
            onClose={() => handleCloseSnackBar()}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Your message was sent successfully!
          </Alert>
        ) : errorMessage ? (
          <Alert
            onClose={() => handleCloseSnackBar()}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {errorMessage}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  )
}
