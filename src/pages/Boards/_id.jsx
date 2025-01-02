import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BroadContent from './BoardContent'

function Broad() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BroadContent/>
    </Container>
  )
}
export default Broad