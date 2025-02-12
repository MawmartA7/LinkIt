import { Api } from './axios-config'

interface ICreateData {
  id?: string
  url: string
  alias: string
}

const create = async (data: ICreateData) => {
  try {
    const response = await Api.post('/api/v1/shorten', data)
    if (response.status === 201) return 'success'

    return new Error('An error occurred while trying to create a new Shortened')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export const ShortenService = {
  create
}
