import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIFGHT = '58px'
const BOAER_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIFGHT} - ${BOAER_BAR_HEIGHT})`

// Create a theme instance
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIFGHT,
    boardBarHeight: BOAER_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: red
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: blue,
    //     secondary: red
    //   }
    // }
  },
  components: {
    // Name of the component
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#ecf0f1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#95a5a6',
            borderRadius: '8px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': { borderWidth: '1px' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          //  color: theme.palette.primary.main,
          fontSize: '0.875rem'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          //  color: theme.palette.primary.main,
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {

          fontSize: '0.875rem',
          '& fieldset': { borderWidth: '0.5px !important' }, // fieldset - borderWidth: 2px => bold border 
          '&:hover fieldset': { borderWidth: '1px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1px !important' }
        }
      }
    }
  }
  // other properties
})
export default theme