import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { TextFieldWithMessage } from '..'
import { useField } from '@unform/core'

type THelperMessages = {
  requiredMessage?: string
  validMessage?: string
  errorMessage?: string
}

type TVTextFieldProps = Omit<TextFieldProps, 'variant'> & {
  variant: 'withMessage' | 'filled' | 'outlined' | 'standard'
  name: string
  helperMessages?: THelperMessages
  value?: string

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const VTextField: React.FC<TVTextFieldProps> = ({
  variant,
  name,
  helperMessages = {},
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
