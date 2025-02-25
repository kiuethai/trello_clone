import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BroadContent from './BoardContent/BroadContent'
import { mockData } from '~/apis/mock-data'

import { fetchBoardDetailsAPI } from '~/apis'
function Broad() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '67bc367cd6b0ce5558773a41'
    // call api
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BroadContent board={mockData.board} />
    </Container>
  )
}
export default Broad