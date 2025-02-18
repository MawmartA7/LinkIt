export interface ITimeFormattable {
  expiredAt: number
  expiredAtFormated?: string
}

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24
const MILLISECONDS_IN_HOUR = 1000 * 60 * 60
const MILLISECONDS_IN_MINUTE = 1000 * 60

export const formatTimeRemaining = (item: ITimeFormattable): void => {
  const expirationDate = new Date(item.expiredAt)
  const currentDate = new Date()

  if (expirationDate < currentDate) {
    item.expiredAtFormated = 'Expired'
    return
  }

  const diffInMilliseconds = expirationDate.getTime() - currentDate.getTime()

  const days = Math.floor(diffInMilliseconds / MILLISECONDS_IN_DAY)
  const hours = Math.floor(
    (diffInMilliseconds % MILLISECONDS_IN_DAY) / MILLISECONDS_IN_HOUR
  )
  const minutes = Math.floor(
    (diffInMilliseconds % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE
  )

  item.expiredAtFormated = [
    days > 0 ? `${days} day` : '',
    hours > 0 ? `${hours}h` : '',
    minutes !== 0 && days === 0 ? `${minutes}min` : ''
  ].join(' ')
}
