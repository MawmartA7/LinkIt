import * as yup from 'yup'

interface IAuthData {
  email: string
  password: string
}

interface ICreateData {
  url: string
  alias: string
  id?: string
}

export const authValidationSchema: yup.ObjectSchema<IAuthData> = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })

export const createShortenedUrl: yup.ObjectSchema<ICreateData> = yup
  .object()
  .shape({
    url: yup.string().url().required(),
    alias: yup.string().min(5).required(),
    id: yup.string().optional()
  })
