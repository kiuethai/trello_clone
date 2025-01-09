import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BroadContent from './BoardContent/BroadContent'
import { mockData } from '~/apis/mock-data'

function Broad() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BroadContent board={mockData?.board} />
    </Container>
  )
}
export default Broad