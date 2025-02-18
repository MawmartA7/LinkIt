import { useCallback, useRef } from 'react'

export const useDebounce = (delay = 300) => {
  const debouncing = useRef<number>(null)

  const debounce = useCallback(
    (func: () => void) => {
      if (debouncing.current) {
        clearTimeout(debouncing.current)
      }

      debouncing.current = setTimeout(() => func(), delay)
    },
    [delay]
  )

  return { debounce }
}
