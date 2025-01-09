import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import { AppThemeProvider } from './shared/contexts/ThemeContext'
import { AuthProvider } from './shared/contexts'

function App() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </AppThemeProvider>
  )
}

export default App
