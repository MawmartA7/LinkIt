import { Api } from './axios-config'

export type TShortenStatus = 'available' | 'disabled' | 'expired'

export type TSimpleShorten = {
  alias: string
  status: TShortenStatus
  clicks: number
  expiredAt: string
}

interface ICreateData {
  id?: string
  url: string
  alias: string
}

interface IShortenedDetails {
  originalUrl: string
  shortenedUrl: string
  status: TShortenStatus
  clicks: number
  expiredAt: string
  createdAt: string
  lastAccessed: string
  statusModifiedAt: string
}

export interface IAllShorteneds {
  pageNumber: number
  numbersOfPages: number
  shorteneds: TSimpleShorten[]
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

const getByAlias = async (
  alias: string
): Promise<IShortenedDetails | Error> => {
  try {
    const response = await Api.get(`/api/v1/details/${alias}`)
    if (response.status === 200) return response.data

    return new Error(
      'An error occurred while trying to recover Shortened details'
    )
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

const getAll = async (
  page: number,
  size: number
): Promise<IAllShorteneds | Error> => {
  try {
    const response = await Api.get(
      `/api/v1/shortened/all?page=${page}&size=${size}`
    )
    if (response.status === 200) return response.data

    return new Error('An error occurred while trying to recover all Shorteneds')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

const changeStatus = async (alias: string, status: TShortenStatus) => {
  try {
    const response = await Api.get(`/api/v1/status/${alias}/${status}`)
    if (response.status === 204) return 'success'

    return new Error(
      'An error occurred while trying to change the status to' + status
    )
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

const deleteShortened = async (alias: string) => {
  try {
    const response = await Api.get(`/api/v1/status/${alias}/delete`)
    if (response.status === 204) return 'success'

    return new Error('An error occurred while trying to delete')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export const ShortenService = {
  create,
  getByAlias,
  getAll,
  changeStatus,
  delete: deleteShortened
}
