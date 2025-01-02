import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { blue, red, teal } from '@mui/material/colors'


// Create a theme instance
const theme = extendTheme({
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: red
      }
    },
    dark: {
      palette: {
        primary: blue,
        secondary: red
      }
    }
  }
})
export default theme