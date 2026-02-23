<template>
  <div class="host">
    <div class="host-container">
      <div class="host-card">
        <h1 class="host-title">PANEL ÚLOH</h1>
        <div class="session-code">Session: {{ store.sessionId }}</div>

        <GameTimer />

        <div class="controls">
          <button v-if="!store.gameStarted" class="host-btn start-btn" @click="store.startGame">
            Spustiť hru
          </button>

          <button v-else class="host-btn end-btn" @click="store.endGame">Ukončiť hru</button>
        </div>

        <div class="progress-wrapper" v-if="totalTasks > 0">
          <div class="progress-label">🛠️ Progres: {{ completedTasks }} / {{ totalTasks }}</div>

          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
        </div>

        <div class="task-grid">
          <div
            v-for="(status, user) in store.tasks"
            :key="user"
            class="task-card"
            :class="status ? 'done' : 'pending'"
          >
            <div class="task-name">{{ user }}</div>
            <div class="task-status">
              {{ status ? 'Úloha splnená' : 'Úloha nie je splnená' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="store.alertMessage" class="alert">
      {{ store.alertMessage }}
    </div>
  </div>
</template>

<script setup>
import { useSessionStore } from '../stores/session'
import GameTimer from '../components/GameTimer.vue'
import { computed } from 'vue'

const store = useSessionStore()

const totalTasks = computed(() => Object.keys(store.tasks || {}).length)

const completedTasks = computed(() => Object.values(store.tasks || {}).filter(Boolean).length)

const progress = computed(() => {
  if (!totalTasks.value) return 0
  return Math.round((completedTasks.value / totalTasks.value) * 100)
})
</script>

<style scoped>
.host {
  height: 100vh;
  display: flex;
  justify-content: center;
  background: radial-gradient(circle at top, #1e293b, #020617);
  color: white;
  font-family: 'Audiowide', sans-serif;
}

.host-container {
  width: 100%;
  margin-top: min(60px, 10%);
  max-width: min(900px, 95vw);
}

.host-card {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(14px);
  border-radius: 24px;
  padding: 32px;
  box-shadow:
    0 0 25px rgba(34, 197, 94, 0.15),
    0 0 80px rgba(0, 0, 0, 0.6);
}

.host-title {
  font-size: clamp(1rem, 2rem, 3rem);
  text-align: center;
  margin-bottom: 6px;
  color: #22c55e;
  text-shadow:
    0 0 6px #22c55e,
    0 0 14px #16a34a;
}

.session-code {
  text-align: center;
  color: #94a3b8;
  margin-bottom: 10px;
  font-size: 1rem;
}

.timer {
  text-align: center;
  margin-bottom: 24px;
  font-size: 1.3rem;
  color: #22c55e;
  text-shadow: 0 0 8px #22c55e;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 30px;
}

.host-btn {
  border: none;
  border-radius: 14px;
  padding: 12px 20px;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s;
}

/* Start */
.start-btn {
  background: #22c55e;
  color: black;
  box-shadow: 0 0 12px #22c55e;
}

.start-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 18px #22c55e;
}

/* End */
.end-btn {
  background: #ef4444;
  color: white;
  box-shadow: 0 0 12px #ef4444;
}

.end-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 18px #ef4444;
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.card {
  border-radius: 20px;
  padding: 20px;
  border: 3px solid;
  text-align: center;
}

.task-card {
  padding: 16px;
  border-radius: 18px;
  text-align: center;
  transition: 0.25s;
  background: #0e131c;
  border: 2px solid transparent;
}

/* Pending = red glow */
.pending {
  border-color: #ef4444;
  color: #ef4444;
  box-shadow:
    0 0 10px #ef4444,
    inset 0 0 10px rgba(239, 68, 68, 0.3);
}

/* Done = green glow */
.done {
  border-color: #22c55e;
  color: #22c55e;
  box-shadow:
    0 0 10px #22c55e,
    inset 0 0 10px rgba(34, 197, 94, 0.3);
}

.task-name {
  font-size: 1rem;
  margin-bottom: 6px;
}

.task-status {
  font-size: 0.8rem;
  opacity: 0.8;
}

.alert {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: #22c55e;
  color: black;
  padding: 16px 24px;
  border-radius: 12px;
  font-weight: bold;
  z-index: 1000;
}

.progress-wrapper {
  margin-bottom: 24px;
}

.progress-label {
  font-size: clamp(1rem, 2vh, 1.4rem);
  margin-bottom: 8px;
  opacity: 0.8;
  text-align: center;
}

.progress-bar {
  height: clamp(12px, 1.6vh, 20px);
  width: 100%;
  background: #1c1c1c;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid #333;
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #c13bf6, #22c5af);
  border-radius: inherit;
  transition: width 0.5s cubic-bezier(0.4, 2, 0.3, 1);
  box-shadow: 0 0 12px rgba(0, 255, 166, 0.5);
}
</style>
