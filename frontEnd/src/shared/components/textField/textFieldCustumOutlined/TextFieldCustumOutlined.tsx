import { TextField, TextFieldProps, useTheme } from '@mui/material'
import { JSX } from 'react'

type TTextFieldCustumOutlinedProps = TextFieldProps & {
  value: string
  error: boolean
  clearError: () => void
  setValue: React.Dispatch<React.SetStateAction<string>>
  defaultValue: string
  startAdornment?: JSX.Element
  endAdornment?: JSX.Element
  maxLength?: number
  inputType: 'text' | 'numeric'

  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export const TextFieldCustumOutlined: React.FC<
  TTextFieldCustumOutlinedProps
> = ({
  value,
  error,
  clearError,
  setValue,
  defaultValue,
  startAdornment,
  endAdornment,
  maxLength,
  inputType,

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
        const inputValue = e.target.value
        if (inputType === 'numeric' && !/^\d*$/.test(inputValue)) {
          return
        }
        setValue(inputValue)

        onChange?.(e)
      }}
      fullWidth
      size="small"
      sx={{
        'borderRadius': 2,
        'minHeight': 40,
        '.MuiOutlinedInput-root': {
          'fieldset': {
            minHeight: 45,
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
            '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.777)' }
          },
          '& .MuiSelect-icon': {
            color: '#bbb'
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
          maxLength: maxLength,
          inputMode: inputType,
          pattern: inputType === 'text' ? undefined : '[0-9]*',
          sx: {
            'pt': 1.25,
            'color': '#c5cad3',
            '&::placeholder': { color: '#c5cad3' },
            '&.Mui-disabled': {
              WebkitTextFillColor: 'rgba(0, 0, 0, 0.777)',
              color: 'rgba(0, 0, 0, 0.777)'
            }
          }
        },
        input: { endAdornment: endAdornment, startAdornment: startAdornment }
      }}
      {...rest}
    />
  )
}
