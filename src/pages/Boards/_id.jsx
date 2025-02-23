import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BroadContent from './BoardContent/BroadContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'
function Broad() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '67bafc57cd476636878e63f0'
    // call api
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BroadContent board={board} />
    </Container>
  )
}
export default Broad