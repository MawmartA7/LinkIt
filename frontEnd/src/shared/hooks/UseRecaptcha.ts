/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { Environment } from '../environment'

type TRecaptchaAction = 'contact' | 'login' | 'register'

export const UseRecaptcha = () => {
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false)

  useEffect(() => {
    if ((window as any).grecaptcha) {
      setIsRecaptchaReady(true)
    } else {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${Environment.RECAPTCHA_SITE_KEY}`
      script.async = true
      script.onload = () => setIsRecaptchaReady(true)
      document.body.appendChild(script)
    }
  }, [])

  const executeRecaptcha = useCallback(
    async (action: TRecaptchaAction) => {
      if (isRecaptchaReady && (window as any).grecaptcha) {
        return await (window as any).grecaptcha.execute(
          Environment.RECAPTCHA_SITE_KEY,
          { action }
        )
      }
    },
    [isRecaptchaReady]
  )

  return executeRecaptcha
}
