import * as yup from 'yup'

interface IAuthData {
  email: string
  password: string
}

export const authValidationSchema: yup.ObjectSchema<IAuthData> = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })
