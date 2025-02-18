import { ChangeEvent, JSX, useEffect, useMemo, useState } from 'react'
import { TextFieldWithMessage, TextFieldCustumOutlined } from '../..'
import { TextField, TextFieldProps } from '@mui/material'
import { useField } from '@unform/core'

type THelperMessages = {
  requiredMessage?: string
  validMessage?: string
  errorMessage?: string
}

type TVTextFieldProps = Omit<TextFieldProps, 'variant'> & {
  variant: 'withMessage' | 'custumOutlined' | 'filled' | 'outlined' | 'standard'
  name: string
  helperMessages?: THelperMessages
  value?: string
  startAdornment?: JSX.Element
  endAdornment?: JSX.Element
  maxLength?: number
  inputType?: 'text' | 'numeric'

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const VTextField: React.FC<TVTextFieldProps> = ({
  variant,
  name,
  helperMessages = {},
  startAdornment,
  endAdornment,
  maxLength,
  inputType,
  onChange,
  ...rest
}) => {
  const { registerField, fieldName, defaultValue, error, clearError } =
    useField(name)

  const [value, setValue] = useState<string>('')

  const messages = useMemo(
    () => ({
      requiredMessage:
        helperMessages.requiredMessage || 'This field is required',
      validMessage: helperMessages.validMessage || 'Field is valid',
      errorMessage: helperMessages.errorMessage || error || ''
    }),
    [error, helperMessages]
  )

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue)
    })
  }, [fieldName, registerField, value])

  return variant === 'withMessage' ? (
    <TextFieldWithMessage
      value={value}
      error={!!error}
      setValue={setValue}
      helperMessages={messages}
      defaultValue={defaultValue}
      clearError={clearError}
      onChange={onChange}
      {...rest}
    />
  ) : variant === 'custumOutlined' ? (
    <TextFieldCustumOutlined
      value={value}
      error={!!error}
      clearError={clearError}
      setValue={setValue}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      maxLength={maxLength}
      inputType={inputType ? inputType : 'text'}
      defaultValue={defaultValue}
      onChange={onChange}
      {...rest}
    />
  ) : (
    <TextField
      value={value}
      onChange={e => {
        setValue(e.target.value)
        onChange?.(e)
      }}
      variant={variant}
      {...rest}
    />
  )
}
