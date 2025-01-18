import { ChangeEvent } from 'react'
import { TextField, TextFieldProps, useTheme } from '@mui/material'

type TTextFieldCustumOutlinedProps = TextFieldProps & {
  value: string
  error: boolean
  clearError: () => void
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
  clearError,
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
      onKeyDown={() => {
        if (error) clearError()
      }}
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
          },
          '&.Mui-disabled': {
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.777)'
            }
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
            },
            '&.Mui-disabled': {
              WebkitTextFillColor: 'rgba(0, 0, 0, 0.777)',
              color: 'rgba(0, 0, 0, 0.777)'
            }
          }
        },
        htmlInput: {
          sx: {
            'pt': 1.25,
            'color': '#c5cad3',
            '&::placeholder': {
              color: '#c5cad3'
            },
            '&.Mui-disabled': {
              WebkitTextFillColor: 'rgba(0, 0, 0, 0.777)',
              color: 'rgba(0, 0, 0, 0.777)'
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
