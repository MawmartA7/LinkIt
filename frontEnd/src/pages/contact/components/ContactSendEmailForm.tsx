import { useEffect, useState } from 'react'
import { contactValidationSchema } from '../../../shared/forms/schemas'
import { UseRecaptcha } from '../../../shared/hooks/UseRecaptcha'
import { Box, Button, MenuItem, Typography } from '@mui/material'
import { VTextField } from '../../../shared/components'
import { useVForm, VForm } from '../../../shared/forms'
import {
  ContactService,
  IMailData
} from '../../../shared/services/ContactService'
import { ISubjectOption } from '../Contact'
import * as yup from 'yup'

interface ContactSendEmailProps {
  subjectOptions: ISubjectOption[]
  setErrorMessage: (message: string) => void
  setIsSuccessful: (isSuccessful: boolean) => void
}

export const ContactSendEmail: React.FC<ContactSendEmailProps> = ({
  subjectOptions,
  setErrorMessage,
  setIsSuccessful
}) => {
  const [charsLeft, setCharsLeft] = useState(250)

  const { formRef, save } = useVForm()
  const { executeRecaptcha } = UseRecaptcha()

  useEffect(() => {
    formRef.current?.setData({
      subject: 'question'
    } as IMailData)
  }, [formRef])

  const handleSendEmail = async (data: IMailData) => {
    try {
      const validatedData = await contactValidationSchema.validate(data, {
        abortEarly: false
      })

      const recaptchaToken = await executeRecaptcha('contact')

      const response = await ContactService.SendEmail(
        validatedData,
        recaptchaToken
      )

      if (response === 'success') {
        setIsSuccessful(true)
      } else {
        throw response
      }
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

      setErrorMessage('Error while send email.')
    }
  }

  return (
    <VForm
      ref={formRef}
      onSubmit={handleSendEmail}
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
          maxLength={50}
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
            <Typography component="span" variant="body2" sx={{ color: '#bbb' }}>
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
    </VForm>
  )
}
