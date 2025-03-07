import { Api } from './axios-config'

type TSortDirection = 'asc' | 'desc'

type TSortableColumns = 'clicks' | 'expiredAt'

export type TShortenStatus = 'available' | 'disabled' | 'expired'

interface ICreateData {
  id?: string
  url: string
  alias: string
}

export type TSimpleShorten = {
  originalDomain: string
  shortenedUrl: string
  clicks: number
  expiredAt: number
  alias: string
}

export interface IShortenedDetails {
  originalUrl: string
  shortenedUrl: string
  status: TShortenStatus
  clicks: number
  expiredAt: number
  createdAt: number
  lastAccessed: number
  statusModifiedAt: number
}

export interface IAllShorteneds {
  totalCount: number
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

const getAll = async (
  search: string,
  page: number,
  size: number,
  orderBy: TSortableColumns,
  order: TSortDirection
): Promise<IAllShorteneds | Error> => {
  try {
    const response = await Api.get(
      `/api/v1/shortened/all?search=${search}&page=${page}&size=${size}&orderBy=${orderBy}&order=${order.toUpperCase()}`
    )
    if (response.status === 200) return response.data

    return new Error('An error occurred while trying to recover all Shorteneds')
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

export const ShortenService = {
  create,
  getAll,
  getByAlias
}
