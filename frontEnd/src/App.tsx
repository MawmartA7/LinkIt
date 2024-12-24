import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import { AppThemeProvider } from './shared/contexts/ThemeContext'

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppThemeProvider>
  )
}

export default App
