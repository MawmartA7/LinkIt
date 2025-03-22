import { Api } from './axios-config'
import { AxiosError } from 'axios'

export type TSubjectValueOptions =
  | 'question'
  | 'suggestion'
  | 'bug'
  | 'removal'
  | 'abuse-report'
  | 'other'

export interface IMailData {
  name: string
  subject: TSubjectValueOptions
  message: string
}

const SendEmail = async (data: IMailData, token: string) => {
  try {
    const response = await Api.post('/contact/send-email', { ...data, token })

    if (response.status === 204) {
      return 'success'
    }

    return new Error('Error while contact by send an email to dev')
  } catch (error) {
    if (error instanceof AxiosError)
      if (
        error.response?.status &&
        (error.response?.data as { code: string }).code === 'BOT_DETECTED'
      ) {
        return new Error('Automated behavior detected.')
      }

    return new Error((error as { message: string }).message)
  }
}

export const ContactService = { SendEmail }
