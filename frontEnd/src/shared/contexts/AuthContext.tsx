import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { AuthService } from '../services/AuthService'

interface IAuthContextData {
  isAuthenticated: boolean
  isCheckingAuth: boolean
  firstLoad: boolean
  login: (email: string, password: string) => Promise<string | undefined>
  logout: () => void
}

const AuthContext = createContext({} as IAuthContextData)

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isLoged, setIsLoged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await AuthService.refresh()

        if (response === 'success') {
          setIsLoged(true)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
        setFirstLoad(false)
      }
    }
    refresh()
  }, [])

  const handleLogin = useCallback(async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const response = await AuthService.login(email, password)

      console.log(response)
      if (response instanceof Error) throw response

      if (response === 'success') {
        setIsLoged(true)
        return response
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleLogout = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await AuthService.logout()

      console.log(response)
      if (response === 'success') setIsLoged(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isLoged,
        isCheckingAuth: isLoading,
        firstLoad,
        login: handleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
