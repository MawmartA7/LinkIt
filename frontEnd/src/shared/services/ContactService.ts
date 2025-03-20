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
