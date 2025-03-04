import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import ContentCopy from '@mui/icons-material/ContentCopy'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import { Button } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCard from './ListCards/ListCard'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'

function Column({ column, createNewCard, deleteColumDetails }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnsStyles = {
    // touchAction: 'none', // dành cho sensor default dạng PointerSensor
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%', // chiều cao phải luôn max 100% vì nếu không sẽ lỗi lúc kéo column ngắn qua một cái column dài thì phải kéo ở khu vực giữa giữa
    //  Lưu ý lúc này phải kết hợp với {…listeners} nằm ở Box chứ không phải ở div ngoài cùng để tránh trường hợp kéo vào vùng xanh.
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }
  // Column đã được sắp xếp ở component cha cao nhất
  const orderedCards = column.cards

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please enter Card Title!', { position: 'bottom-right' })
      return
    }
    // console.log(newCardTitle)
    // Gọi API
    // Tạo dữ liệu column để gọi API
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    await createNewCard(newCardData)
    // Đóng trạng thái thêm Card mới & Clewr Input
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }
  // Xử lý xóa một Column và Cards nên trong nó
  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete Column?',
      description: 'This action will permanently delete your Column and its Cards! Are you sure? ',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'

    }).then(() => { deleteColumDetails(column._id) }).catch(() => { })

  }

  {/* Box Column test 01 */ }
  // Phải bọc div ở đây vì vấn đề chiều cao của column khi kéo thả sẽ có bug kiểu flickering
  return (
    <div ref={setNodeRef} style={dndKitColumnsStyles} {...attributes}>
      < Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }
        }>
        {/* Box Column Header */}
        < Box sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title="More options">
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-button-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-dropdown'
              }}
            >
              <MenuItem
                onClick={toggleOpenNewCardForm}
                sx={{
                  '&:hover': {
                    color: '#95afc0', '& .add-card-icon': { color: '#95afc0' }
                  }
                }}
              >
                <ListItemIcon><AddCardIcon className='add-card-icon' fontSize="small" /></ListItemIcon>
                <ListItemText >Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleDeleteColumn}
                sx={{
                  '&:hover': {
                    color: 'warning.dark', '& .delete-forever-icon': { color: 'warning.dark' }
                  }
                }}
              >
                <ListItemIcon><DeleteForeverIcon className='delete-forever-icon' fontSize="small" /></ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box >
        {/* Box List card */}
        <ListCard cards={orderedCards} />
        {/* Box Column Footer */}
        < Box sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2
        }}>
          {
            !openNewCardForm
              ? <Box sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm}>Add new card</Button>
                <Tooltip title="Drag to move">
                  < DragHandleIcon />
                </Tooltip>
              </Box>
              : <Box sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <TextField
                  label="Enter card title..."
                  type="text"
                  size='small'
                  variant='outlined'
                  autoFocus
                  data-no-dnd="true"
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  sx={{
                    '& label': { color: 'text.primary' },
                    '& input': {
                      color: (theme) => theme.palette.primary.main,
                      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                    },
                    '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                      '& :hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                      '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                    },
                    '& .MuiOutlinedInput-input': {
                      borderRadius: 1
                    }
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    onClick={addNewCard}
                    variant='contained' color='success' size='small'
                    data-no-dnd="true"
                    sx={{
                      boxShadow: 'none',
                      border: '0.5px solid',
                      borderColor: (theme) => theme.palette.success.main,
                      '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                    }}
                  >Add</Button>
                  <CloseIcon
                    fontSize='small'
                    sx={{
                      color: (theme) => theme.palette.warning.light,
                      cursor: 'pointer'
                    }}
                    onClick={toggleOpenNewCardForm}
                  />
                </Box>
              </Box>


          }

        </Box >
      </Box >
    </div>
  )
}

export default Column