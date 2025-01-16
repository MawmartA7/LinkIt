import { ChangeEvent, useEffect, useState } from 'react'
import { Icon, TextField, TextFieldProps, useTheme } from '@mui/material'

type THelperMessages = {
  requiredMessage: string
  validMessage: string
  errorMessage: string
}

type TTextFieldWithMessageProps = TextFieldProps & {
  value: string
  error: boolean
  setValue: React.Dispatch<React.SetStateAction<string>>
  helperMessages: THelperMessages
  defaultValue: string

  clearError: () => void
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const TextFieldWithMessage: React.FC<TTextFieldWithMessageProps> = ({
  value,
  error,
  setValue,
  helperMessages,
  defaultValue,

  clearError,
  onChange,
  ...rest
}) => {
  const [helpText, setHelpText] = useState('')
  const [fieldColor, setFieldColor] = useState('initial')

  const theme = useTheme()

  const isRequired = rest.required

  useEffect(() => {
    if (isRequired && value === '') {
      setHelpText(helperMessages.requiredMessage)
      setFieldColor(theme.palette.warning.light)
    } else if (error) {
      setHelpText(helperMessages.errorMessage)
      setFieldColor(theme.palette.error.light)
    } else if (value !== '') {
      setHelpText(helperMessages.validMessage)
      setFieldColor(theme.palette.success.main)
    } else {
      setHelpText('')
      setFieldColor('initial')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, error])

  return (
    <TextField
      variant="outlined"
      helperText={
        helpText ? (
          <>
            <Icon fontSize="small">info</Icon>
            {helpText}
          </>
        ) : undefined
      }
      onKeyDown={e => {
        if (error) clearError()

        rest.onKeyDown?.(e)
      }}
      value={value}
      defaultValue={defaultValue}
      onChange={e => {
        setValue(e.target.value)
        onChange?.(e)
      }}
      fullWidth
      sx={{
        'bgcolor': '#FFF',
        'borderRadius': 2,
        'height': 40,
        '& .MuiFormHelperText-root': {
          display: 'flex',
          gap: 1,
          color: fieldColor,
          mt: -1
        },
        '.MuiOutlinedInput-root': {
          '& input': {
            pt: 1.25
          },
          'fieldset': {
            height: 45,
            border: value !== '' && error ? '1px solid ' + fieldColor : '0px',
            borderRadius: 2
          },
          '&.Mui-focused fieldset': {
            border: '1px solid ' + fieldColor
          },
          '&:hover fieldset': {
            border: '1px solid ' + fieldColor
          }
        }
      }}
      {...rest}
    />
  )
}
