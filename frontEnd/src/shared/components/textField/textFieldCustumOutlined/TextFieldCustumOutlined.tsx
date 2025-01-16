import { ChangeEvent } from 'react'
import { TextField, TextFieldProps, useTheme } from '@mui/material'

type TTextFieldCustumOutlinedProps = TextFieldProps & {
  value: string
  error: boolean
  setValue: React.Dispatch<React.SetStateAction<string>>
  defaultValue: string
  endAdornment?: JSX.Element

  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const TextFieldCustumOutlined: React.FC<
  TTextFieldCustumOutlinedProps
> = ({
  value,
  error,
  setValue,
  defaultValue,
  endAdornment,

  onChange,
  ...rest
}) => {
  const theme = useTheme()

  return (
    <TextField
      variant="outlined"
      value={value}
      defaultValue={defaultValue}
      onChange={e => {
        setValue(e.target.value)
        onChange?.(e)
      }}
      fullWidth
      sx={{
        'borderRadius': 2,
        'height': 40,
        '.MuiOutlinedInput-root': {
          'fieldset': {
            height: 45,
            border:
              '1px solid ' + (error ? theme.palette.error.light : '#797979'),
            borderRadius: 2
          },
          '&.Mui-focused fieldset': {
            border:
              '1px solid ' +
              (error ? theme.palette.error.light : theme.palette.secondary.main)
          },
          '&:hover fieldset': {
            border:
              '1px solid ' +
              (error ? theme.palette.error.light : theme.palette.secondary.main)
          }
        }
      }}
      slotProps={{
        inputLabel: {
          shrink: true,
          sx: {
            'color': error ? theme.palette.error.light : '#bbbbbb',
            '&.Mui-focused': {
              color: error
                ? theme.palette.error.light
                : theme.palette.secondary.main
            }
          }
        },
        formHelperText: {
          sx: {
            display: 'flex',
            gap: 1,
            color: '#bbbbbb',
            mt: -1
          }
        },
        htmlInput: {
          sx: {
            'pt': 1.25,
            'color': '#c5cad3',
            '&::placeholder': {
              color: '#c5cad3'
            }
          }
        },
        input: {
          endAdornment: endAdornment
        }
      }}
      {...rest}
    />
  )
}
