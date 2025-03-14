/* eslint-disable @typescript-eslint/no-explicit-any */
import { Api } from './axios-config'

const login = async (login: string, password: string) => {
  try {
    const response = await Api.post('/auth/login', { login, password }, {
      _isAuthService: true
    } as any)
    if (response.status === 200) return 'success'

    return new Error('Error while logging in')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

const register = async (login: string, password: string) => {
  try {
    const response = await Api.post('/auth/register', { login, password }, {
      _isAuthService: true
    } as any)
    if (response.status === 201) return 'success'

    return new Error('Error while logging in')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

const logout = async () => {
  try {
    const response = await Api.post('/auth/logout', {}, {
      _isAuthService: true
    } as any)
    if (response.status === 204) return 'success'

    return new Error('Error while logout in')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

const refresh = async () => {
  try {
    const response = await Api.post('/auth/refresh', {}, {
      _isAuthService: true
    } as any)
    if (response.status === 200) return 'success'

    return new Error('Error while refresh the token')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message)
  }
}

const sendPasswordRecoveryEmail = async (email: string) => {
  try {
    const response = await Api.post('/auth/email/forgot-password', { email }, {
      _isAuthService: true
    } as any)

    if (response.status === 204) return 'success'

    return new Error(
      'Error while send the password recovery email confirmation'
    )
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

const confirmEmail = async (id: string, email: string) => {
  try {
    const response = await Api.post('/auth/email', { id, email }, {
      _isAuthService: true
    } as any)

    if (response.status === 204) return 'success'

    return new Error('Error while confirming email')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export const AuthService = {
  login,
  register,
  logout,
  refresh,
  sendPasswordRecoveryEmail,
  confirmEmail
}
