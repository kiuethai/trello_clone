import { useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BroadContent from './BoardContent/BroadContent'
// import { mockData } from '~/apis/mock-data'
import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
  deleteColumDetailsAPI
} from '~/apis'
import { cloneDeep } from 'lodash'
import { Box, CircularProgress, Typography } from '@mui/material'
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'

function Broad() {
  const dispatch = useDispatch(null)
  // Không dùng State của component nữa mà chuyển qua dùng State của Redux
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)

  useEffect(() => {
    const boardId = '67bc367cd6b0ce5558773a41'
    // call api
    dispatch(fetchBoardDetailsAPI(boardId))

  }, [dispatch])


  // Fun này có nhiệm vụ gọi API và xử lý khi kéo thả Column xog xuôi
  const moveColumns = (dndOrderedColumns) => {
    // Update cho chuẩn dữ liệu state Board
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API update Board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Update cho chuẩn dữ liệu state board
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    dispatch(updateCurrentActiveBoard(newBoard))
    // Gọi API update column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    // Update cho chuẩn dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API xử lý phía BE
    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    // Xử lý vấn đề khi kéo phần tử cuối cùng ra khỏi column, Column rỗng sẽ có placeholeder card cần xóa nó đi trước khi gửi dữ liệu lên cho phía BE
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }


  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BroadContent
        board={board}

        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}


      />
    </Container>
  )
}
export default Broad