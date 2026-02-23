import { io } from 'socket.io-client'

const backendUrl = import.meta.env.VITE_BACKEND_URL
export const socket = io(backendUrl || 'http://localhost:3000', {
  autoConnect: true,
})
