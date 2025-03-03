import * as yup from 'yup'
import { Environment } from '../../environment'

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

const urlIsValid: yup.StringSchema = yup
  .string()
  .url('Ops. This is not a valid URL')
  .test(
    'tld-length',
    "Ops. The URL's TLD must be at least 2 chars long",
    value => {
      if (!value) return false

      const tld = new URL(value).hostname.split('.')[1]

      if (!tld) return false

      return tld.length >= 2
    }
  )
  .test(
    'no-protocol-not-allowed',
    'You cannot shorten a URL with this protocol',
    value => {
      if (!value) return false

      if (
        new URL(value).protocol !== 'http:' &&
        new URL(value).protocol !== 'https:'
      ) {
        return false
      }

      return true
    }
  )
  .test(
    'no-domain-not-allowed',
    'URL shortening not allowed for this domain',
    value => {
      if (!value) return false

      if (new URL(value).hostname === new URL(Environment.API_URL).hostname) {
        return false
      }

      return true
    }
  )

const urlIdIsValid: yup.StringSchema = yup
  .string()
  .test(
    'no-forbiden-chars',
    'Ops. The ID cannot contain special characters',
    value => {
      if (!value) return true

      const forbiddenChars = /["<>#%{}|\\^`[\]\n\r\t]/

      const specialChars = ['?', '/', '&', '=', '+', ':', ';', '@']

      return (
        !forbiddenChars.test(value) &&
        !specialChars.some(char => value.includes(char))
      )
    }
  )

const createShortenedLink: yup.ObjectSchema<ICreateData> = yup.object().shape({
  url: urlIsValid.required(),
  alias: yup
    .string()
    .min(5, 'Ops. The alias must be at least 5 chars')
    .max(20, 'Ops. The alias must have a max of 20 chars')
    .required(),
  id: urlIdIsValid.optional()
})

export const shortenUrl = {
  urlIsValid,
  urlIdIsValid,
  createShortenedLink
}
