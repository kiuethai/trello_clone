import Box from '@mui/material/Box'
import ModelSelect from '../../components/ModeSelect/index'

function AppBar() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <ModelSelect />
    </Box>
  )
}

export default AppBar