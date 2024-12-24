import { createTheme } from '@mui/material'
import { blue, grey, indigo } from '@mui/material/colors'

export const Dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue['A400'],
      dark: blue['A700'],
      light: blue['A200'],
      contrastText: grey['50']
    },
    secondary: {
      main: '#4763E4',
      dark: indigo['A400'],
      light: indigo['A200'],
      contrastText: grey['800']
    },
    background: {
      default: grey['800'],
      paper: grey['900']
    }
  },
  typography: {
    allVariants: {
      color: grey['50'],
      fontFamily: 'Roboto, sans-serif'
    }
  }
})
