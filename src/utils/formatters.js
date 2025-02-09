export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}
/**
  * Phía FE sẽ tự tạo ra một cái card dặc biệt: Placeholder Card, không liên quan tới Back-end
  * Card đặc biệt này sẽ được ẩn ở giao diện UI người dùng
  * Cấu trúc Id của cái card này để Unique rất đơn giản, không cần random phức tạp:
  * "columnId-placeholder-card" (mỗi column chỉu có thể tối đa một cái Placeholder Card)
  * quan trong khi tạo: phải đầy đủ: (_id, boardId, columnId, FE_PlaceholderCard)
**/
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}