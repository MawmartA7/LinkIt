import { useEffect, useState } from 'react'
import { GitHub, LinkedIn, WhatsApp } from '@mui/icons-material'
import { VTextField } from '../../shared/components'
import { useVForm } from '../../shared/forms'
import { Form } from '@unform/web'
import {
  useMediaQuery,
  IconButton,
  Typography,
  MenuItem,
  Button,
  Theme,
  Paper,
  Box
} from '@mui/material'

type TSubjectValueOptions =
  | 'question'
  | 'suggestion'
  | 'bug'
  | 'removal'
  | 'abuse-report'
  | 'other'

interface ISubjectOption {
  value: string
  label: string
}

interface IMailData {
  name: string
  subject: TSubjectValueOptions
  message: string
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
  const [charsLeft, setCharsLeft] = useState(250)

  const isUpMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const { formRef, save } = useVForm()

  useEffect(() => {
    formRef.current?.setData({
      subject: 'question'
    } as IMailData)
  }, [formRef])

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

          <Box
            pl={{ md: 2 }}
            mt={{ xs: 2, sm: 4 }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography
              display="flex"
              gap={2}
              alignItems="center"
              color="textSecondary"
              sx={theme => ({
                [theme.breakpoints.down('md')]: {
                  color: '#bbb'
                }
              })}
            >
              <Box
                component="img"
                width="40"
                height="40"
                src={`https://img.icons8.com/?size=40&id=pB1P8RtAJn4H&format=png&color=${isUpMd ? '1f1f1f' : 'bbbbbb'}`}
                alt="Programmer icon"
              />
              Aaron Stewart Martinez
            </Typography>
            <Typography
              display="flex"
              gap={2}
              alignItems="center"
              color="textSecondary"
              sx={theme => ({
                [theme.breakpoints.down('md')]: {
                  color: '#bbb'
                }
              })}
            >
              <Box
                component="img"
                width="40"
                height="40"
                src={`https://img.icons8.com/?size=40&id=63&format=png&color=${isUpMd ? '1f1f1f' : 'bbbbbb'}`}
                alt="Email icon"
              />
              aaronstmart.dev@gmail.com
            </Typography>
            <Typography
              display="flex"
              gap={2}
              alignItems="center"
              color="textSecondary"
              sx={theme => ({
                [theme.breakpoints.down('md')]: {
                  color: '#bbb'
                }
              })}
            >
              <Box
                component="img"
                width="40"
                height="40"
                src={`https://img.icons8.com/?size=40&id=53438&format=png&color=${isUpMd ? '1f1f1f' : 'bbbbbb'}`}
                alt="Phone icon"
              />
              +55 21 99455-5856
            </Typography>
          </Box>
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
          <Form
            ref={formRef}
            onSubmit={data => console.log(data)}
            placeholder={undefined}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <Box display="flex" flexDirection="column" gap={3} pl={2} mt={4}>
              <VTextField
                variant="custumOutlined"
                name="name"
                label="Name"
                placeholder="your name"
                fullWidth={false}
              />
              <VTextField
                variant="custumOutlined"
                name="subject"
                label="Subject"
                select
                fullWidth={false}
              >
                {subjectOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </VTextField>
              <VTextField
                variant="custumOutlined"
                name="message"
                label="Message"
                placeholder="Message"
                multiline
                rows={5}
                maxLength={250}
                helperText={
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: '#bbb' }}
                  >
                    Remaining characters {charsLeft}
                  </Typography>
                }
                onChange={e => {
                  setCharsLeft(250 - e.target.value.length)
                }}
              />
              <Button
                sx={{
                  textTransform: 'none',
                  width: 100,
                  borderRadius: 4
                }}
                variant="contained"
                onClick={save}
              >
                Send
              </Button>
            </Box>
          </Form>
        </Box>
      </Box>
    </Box>
  )
}
