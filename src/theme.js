import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { blue, red, teal } from '@mui/material/colors'


// Create a theme instance
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
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