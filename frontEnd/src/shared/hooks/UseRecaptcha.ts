/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react'
import { Environment } from '../environment'

type TRecaptchaAction = 'contact' | 'login' | 'register'

export const UseRecaptcha = (enabled?: boolean) => {
  const scriptClassName = 'recaptcha-script'
  const badgeClassName = 'grecaptcha-badge'

  useEffect(() => {
    if (enabled) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${Environment.RECAPTCHA_SITE_KEY}`
      script.async = true
      script.className = scriptClassName
      document.body.appendChild(script)
    }

    return () => {
      if (!enabled)
        document
          .querySelectorAll(`.${scriptClassName}`)
          .forEach(script => script.remove())

      document
        .querySelectorAll(`.${badgeClassName}`)
        .forEach(badge => badge.remove())

      document
        .querySelectorAll('div:empty')
        .forEach(emptyDiv => emptyDiv.remove())
    }
  }, [enabled])

  const executeRecaptcha = useCallback(async (action: TRecaptchaAction) => {
    if ((window as any).grecaptcha) {
      return (await (window as any).grecaptcha.execute(
        Environment.RECAPTCHA_SITE_KEY,
        { action }
      )) as string
    }
  }, [])
  return { executeRecaptcha }
}
