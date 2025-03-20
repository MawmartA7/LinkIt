import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Environment } from '../../environment'
import { AuthService } from '../AuthService'

export const Api = axios.create({
  baseURL: Environment.API_URL,
  withCredentials: true
})

Api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _isAuthService?: boolean
      _retry?: boolean
    }
    if (
      error.response?.status === 403 &&
      (error.response.data as { message: string }).message ===
        'Access Denied' &&
      !originalRequest._isAuthService
    ) {
      if (!originalRequest._retry) {
        originalRequest._retry = true

        const refreshResponse = await AuthService.refresh()

        if (refreshResponse === 'success') return Api(originalRequest)
      }
      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)
