import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { AuthService } from '../services/AuthService'

interface IAuthContextData {
  logout: () => void
  isAuthenticated: boolean
  login: (email: string, password: string) => string | undefined
  isCheckingAuth: boolean
}

const AuthContext = createContext({} as IAuthContextData)

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isLoged, setIsLoged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    AuthService.refresh()
      .then(response => {
        console.log(response)
        if (response === 'success') {
          setIsLoged(true)
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleLogin = useCallback((email: string, password: string) => {
    setIsLoading(true)
    let errorMessage: string | undefined
    AuthService.login(email, password)
      .then(response => {
        console.log(response)
        if (response === 'success') setIsLoged(true)
      })
      .catch(error => (errorMessage = (error as { message: string }).message))
      .finally(() => {
        setIsLoading(false)
      })

    return errorMessage
  }, [])

  const handleLogout = useCallback(() => {
    setIsLoading(true)
    AuthService.logout()
      .then(response => {
        console.log(response)
        if (response === 'success') setIsLoged(false)
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isLoged,
        logout: handleLogout,
        login: handleLogin,
        isCheckingAuth: isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
