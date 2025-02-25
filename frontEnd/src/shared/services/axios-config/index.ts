import axios from 'axios'
import { Environment } from '../../environment'

export const Api = axios.create({
  baseURL: Environment.API_URL,
  withCredentials: true
})
