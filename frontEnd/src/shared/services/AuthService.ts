import { Api } from './axios-config'

const login = async (login: string, password: string) => {
  try {
    const response = await Api.post('/auth/login', { login, password })
    if (response.status === 200) return 'success'

    return new Error('Error while logging in')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

const register = async (login: string, password: string) => {
  try {
    const response = await Api.post('/auth/register', { login, password })
    if (response.status === 201) return 'success'

    return new Error('Error while logging in')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

const logout = async () => {
  try {
    const response = await Api.post('/auth/logout')
    if (response.status === 204) return 'success'

    return new Error('Error while logout in')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

const refresh = async () => {
  try {
    const response = await Api.post('/auth/refresh')
    if (response.status === 200) return 'success'

    return new Error('Error while refresh the token')
  } catch (error) {
    console.error(error)

    return new Error((error as { message: string }).message)
  }
}

export const AuthService = {
  login,
  register,
  logout,
  refresh
}
