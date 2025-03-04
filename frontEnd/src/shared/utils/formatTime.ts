interface IFormatDateOptions {
  leadingZeros?: boolean
}

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24
const MILLISECONDS_IN_HOUR = 1000 * 60 * 60
const MILLISECONDS_IN_MINUTE = 1000 * 60

export const formatTimeRemaining = (
  timestamp: string | number | Date
): string => {
  const expirationDate = new Date(timestamp)
  const currentDate = new Date()

  if (expirationDate < currentDate) {
    return 'Expired'
  }

  const diffInMilliseconds = expirationDate.getTime() - currentDate.getTime()

  const days = Math.floor(diffInMilliseconds / MILLISECONDS_IN_DAY)
  const hours = Math.floor(
    (diffInMilliseconds % MILLISECONDS_IN_DAY) / MILLISECONDS_IN_HOUR
  )
  const minutes = Math.floor(
    (diffInMilliseconds % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE
  )

  return [
    days > 0 ? `${days} day` : '',
    hours > 0 ? `${hours}h` : '',
    minutes !== 0 && days === 0 ? `${minutes}min` : ''
  ].join(' ')
}

export const formatDate = (
  timestamp: string | number | Date,
  format: string,
  options: IFormatDateOptions = {
    leadingZeros: true
  }
) => {
  const date = new Date(timestamp)
  const pad = (num: number, length: number = 2) =>
    options.leadingZeros ? String(num).padStart(length, '0') : String(num)

  const map: { [key: string]: string } = {
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).slice(-2),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    SSS: pad(date.getMilliseconds(), 3)
  }

  return format.replace(
    /YYYY|YY|MM|DD|HH|mm|ss|SSS/g,
    (match: string) => map[match]
  )
}
