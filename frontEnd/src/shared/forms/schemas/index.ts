import * as yup from 'yup'
import { Environment } from '../../environment'
import { IMailData } from '../../services/ContactService'

interface IAuthData {
  email: string
  password: string
}

interface ICreateData {
  url: string
  alias: string
  id?: string
}

const emailIsValid: yup.StringSchema = yup
  .string()
  .email('Invalid email')
  .max(254, 'The email must have a max of 254 chars')

const authValidationSchema: yup.ObjectSchema<IAuthData> = yup.object().shape({
  email: emailIsValid.required(),
  password: yup.string().min(5).required()
})

export const authSchemas = {
  authValidationSchema,
  emailIsValid
}

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

const shortenedAliasIsValid: yup.StringSchema = yup
  .string()
  .trim()
  .min(5, 'Ops. The alias must be at least 5 chars')
  .max(20, 'Ops. The alias must have a max of 20 chars')

const createShortenedLink: yup.ObjectSchema<ICreateData> = yup.object().shape({
  url: urlIsValid.required(),
  alias: shortenedAliasIsValid.required(),
  id: urlIdIsValid.optional()
})

export const shortenUrl = {
  urlIsValid,
  urlIdIsValid,
  shortenedAliasIsValid,
  createShortenedLink
}

export const contactValidationSchema: yup.ObjectSchema<IMailData> = yup
  .object()
  .shape({
    name: yup
      .string()
      .trim()
      .max(50, 'The name must have a max of 50 chars')
      .min(3, 'The name must be at least 3 chars')
      .required(),
    subject: yup
      .string()
      .oneOf([
        'question',
        'suggestion',
        'bug',
        'removal',
        'abuse-report',
        'other'
      ])
      .required(),
    message: yup
      .string()
      .trim()
      .max(250, 'The message must have a max of 250 chars')
      .min(10, 'The message must be at least 10 chars')
      .required()
  })
