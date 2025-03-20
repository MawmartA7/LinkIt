import { useEffect, useState } from 'react'
import { IMailData } from '../../../shared/services/ContactService'
import { Box, Button, MenuItem, Typography } from '@mui/material'
import { VTextField } from '../../../shared/components'
import { useVForm, VForm } from '../../../shared/forms'
import { ISubjectOption } from '../Contact'

interface ContactSendEmailProps {
  subjectOptions: ISubjectOption[]
}

export const ContactSendEmail: React.FC<ContactSendEmailProps> = ({
  subjectOptions
}) => {
  const [charsLeft, setCharsLeft] = useState(250)

  const { formRef, save } = useVForm()

  useEffect(() => {
    formRef.current?.setData({
      subject: 'question'
    } as IMailData)
  }, [formRef])

  return (
    <VForm
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
