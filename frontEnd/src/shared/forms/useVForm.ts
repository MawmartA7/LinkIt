import { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (formRef.current) setIsReady(true)
  }, [formRef])

  const handleSave = useCallback(() => {
    formRef.current?.submitForm()
  }, [])

  return {
    formRef,
    isReady,
    save: handleSave
  }
}
