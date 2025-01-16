import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { Dark, Light } from '../theme'
import { Box, ThemeProvider } from '@mui/material'

interface IThemeContextData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

interface IAppThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext({} as IThemeContextData)

export const useAppThemeContext = () => {
  return useContext(ThemeContext)
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({
  children
}) => {
  const [themeName, setTheme] = useState<'light' | 'dark'>('dark')

  const toggleTheme = useCallback(() => {
    setTheme(oldTheme => (oldTheme === 'light' ? 'dark' : 'light'))
  }, [])

  const theme = useMemo(() => {
    return themeName === 'light' ? Light : Dark
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          minHeight="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
