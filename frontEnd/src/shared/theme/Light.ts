import { createTheme } from '@mui/material'
import { blue, grey, indigo } from '@mui/material/colors'

export const Light = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue['A400'],
      dark: blue['A700'],
      light: blue['A200'],
      contrastText: '#fff'
    },
    secondary: {
      main: '#4763E4',
      dark: indigo['A400'],
      light: indigo['A200'],
      contrastText: '#fff'
    },
    background: {
      default: '#fff',
      paper: grey['300']
    }
  },
  typography: {
    allVariants: {
      color: grey['900'],
      fontFamily: 'Roboto, sans-serif'
    }
  }
})
