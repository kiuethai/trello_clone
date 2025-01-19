
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  //PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'


const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BroadContent({ board }) {
  // fix trường hợp click bị gọi event
  // nếu dùng PointerSensor mặc định thì phải kết hợp thuộc tính CSS touch-action: none ở những phần trử kéo thả- nhưng mà còn bug 
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event 
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Nhân giữ 250ms và dung sai của cảm ứng  500px thì mới kích hoạt event 
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // const sensor = useSensors(pointerSensor)
  // Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch
  const sensor = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // cùng một thời điểm chỉ có một phần tiwr đang được kéo (column hoăc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Trigger khi bắt đầi kéo một phần tử
  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  // Trigger khi kết thúc hành động  kéo (drag) một phần tử =>  hành động thả (drop)
  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)
    const { active, over } = event
    // kiểm tra nếu không tồn tại over
    if (!over) return

    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      // Lấy vị trí cũ (từ thằng active)
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
      // Lấy vị trí mới ( từ thằng over)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // console.log  dữ liệu này  sau dùng để xử lý gọi API
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumns: ', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)

      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  // console.log('activeDragItemId ', activeDragItemId)
  // console.log('activeDragItemType ', activeDragItemType)
  // console.log('activeDragItemData ', activeDragItemData)

  const customDropAnimation = { 
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  return (
    <DndContext
      sensors={sensor}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1973d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}

        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BroadContent