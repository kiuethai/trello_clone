import { io } from 'socket.io-client'
import { API_ROOT } from '~/utils/constants'
export const socketIoInstance = io(API_ROOT, {
  transports: ['websocket', 'polling'], // Hỗ trợ cả WebSocket và polling
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5
})