import { defineStore } from 'pinia'
import { socket } from '../socket'

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessionId: null as string | null,
    userId: null as string | null,
    isHost: false,
    tasks: {},
    gameStarted: false,
    startTime: null as number | null,
    elapsedTime: 0,
    timerInterval: null as ReturnType<typeof setInterval> | null,
    alertMessage: '',
  }),

  actions: {
    createSession() {
      const id = Math.floor(1000 + Math.random() * 9000).toString()
      this.sessionId = id
      this.isHost = true

      socket.emit('create-session', id)
      this.listen()
    },

    joinSession(id: string | null) {
      const user = 'Task-' + Math.floor(Math.random() * 1000)
      this.sessionId = id
      this.userId = user

      socket.emit('join-session', { sessionId: id, userId: user })
      this.listen()
    },

    startGame() {
      this.clearAlert()
      socket.emit('start-game', this.sessionId)
    },

    endGame() {
      socket.emit('end-game', this.sessionId)
      this.stopTimer()
    },

    toggleTask(status: boolean) {
      socket.emit('toggle-task', {
        sessionId: this.sessionId,
        userId: this.userId,
        status,
      })
    },

    listen() {
      socket.off('update-session')
      socket.off('game-won')
      socket.off('clear-alert') // ensure no duplicates

      socket.on('update-session', (session) => {
        this.tasks = session.tasks
        this.gameStarted = session.gameStarted
        this.startTime = session.startTime
        if (this.gameStarted) {
          this.startTimer()
        } else {
          this.stopTimer()
        }
      })

      socket.on('game-won', () => {
        this.alertMessage = 'Občania vyhrali!'
        this.stopTimer()
      })

      socket.on('clear-alert', () => {
        this.clearAlert() // sets alertMessage = ""
      })
    },
    // ---------------- Timer ----------------
    startTimer() {
      this.stopTimer()
      this.timerInterval = setInterval(() => {
        if (this.startTime) {
          this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000)
        }
      }, 1000)
    },

    stopTimer() {
      if (this.timerInterval) clearInterval(this.timerInterval)
      this.elapsedTime = 0
      this.timerInterval = null
    },

    clearAlert() {
      this.alertMessage = ''
    },
  },
})
