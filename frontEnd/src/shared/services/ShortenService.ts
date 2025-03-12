import { TExpirationFilter } from '../../pages'
import { AuthService } from './AuthService'
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

const refreshCount = 0

const refreshAndTryAgain = async (tryAgain: () => void) => {
  if (refreshCount >= 1) {
    return new Error('The refresh count has been exceeded')
  }

  const result = await AuthService.refresh()

  if (result instanceof Error) {
    return new Error(
      'An error occurred while trying to refresh the access token'
    )
  }

  tryAgain()
}

const create = async (data: ICreateData) => {
  try {
    const response = await Api.post('/api/v1/shorten', data)
    if (response.status === 201) return 'success'

    if (response.status === 403) {
      let responseReturn: Promise<Error | 'success'> = Promise.resolve(
        new Error('Unauthorized')
      )
      await refreshAndTryAgain(() => {
        responseReturn = create(data)
      })
      return responseReturn
    }
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
  order: TSortDirection,
  expirationFilter: TExpirationFilter
): Promise<IAllShorteneds | Error> => {
  try {
    const response = await Api.get(
      `/api/v1/shortened/all?search=${search}&page=${page}&size=${size}&orderBy=${orderBy}&order=${order.toUpperCase()}&expirationFilter=${expirationFilter}`
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

const changeStatusByAlias = async (
  alias: string,
  newStatus: Omit<TShortenStatus, 'expired'>
) => {
  try {
    const response = await Api.patch(
      `/api/v1/status/${alias}/${newStatus}`,
      {},
      { withCredentials: true }
    )
    if (response.status === 204) return 'success'

    return new Error(
      'An error occurred while trying to change the status to ' +
        newStatus +
        'by alias: ' +
        alias
    )
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

const deleteByAlias = async (alias: string) => {
  try {
    const response = await Api.delete(`/api/v1/shorten/${alias}/delete`)
    if (response.status === 204) return 'success'

    return new Error(
      'An error occurred while trying to delete by alias: ' + alias
    )
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export const ShortenService = {
  create,
  getAll,
  getByAlias,
  changeStatusByAlias,
  deleteByAlias
}
