import { Api } from './axios-config'

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

    if (response.status === 403) {
      return new Error('Automated behavior detected.')
    }

    return new Error('Error while contact by send an email to dev')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export const ContactService = { SendEmail }
