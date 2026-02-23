<template>
  <div class="join" :class="bg">
    <form v-if="!store.sessionId" class="join-form">
      <input v-model="sessionInput" placeholder="Kód" class="join-input" />
      <button @click="join" class="join-btn">Pripojiť sa</button>
    </form>

    <div v-else class="game">
      <h2 :class="completed ? 'gradient-done' : 'gradient-pending'">
        {{ store.userId }}
      </h2>

      <GameTimer />

      <button
        :class="completed ? 'task-btn done-btn' : 'task-btn pending-btn'"
        @click="toggle"
        :disabled="!store.gameStarted || store.alertMessage !== ''"
      >
        <span :class="completed ? 'gradient-done' : 'gradient-pending'">
          {{ completed ? 'ÚLOHA SPLNENÁ' : 'SPLNIŤ ÚLOHU' }}
        </span>
      </button>
    </div>

    <div v-if="store.alertMessage" class="alert">
      {{ store.alertMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useSessionStore } from '../stores/session'
import GameTimer from '../components/GameTimer.vue'

const store = useSessionStore()
const sessionInput = ref('')
const completed = ref(false)

function join() {
  if (!sessionInput.value.trim()) return
  store.joinSession(sessionInput.value)
}

function toggle() {
  completed.value = !completed.value
  store.toggleTask(completed.value)
}

// Background color based on completion
const bg = computed(() =>
  !store.sessionId ? 'join-bg' : completed.value ? 'done-bg' : 'pending-bg',
)

// Reset completion whenever game starts/ends
watch(
  () => store.gameStarted,
  (newVal) => {
    if (newVal) completed.value = false
    else completed.value = false
  },
)
</script>

<style scoped>
.join {
  height: 100vh;
  display: grid;
  place-content: center;
  transition: 0.3s;
}

.join-bg {
  background: radial-gradient(circle, #0e0a45db, #020617);
}

.pending-bg {
  background: radial-gradient(circle, #450a0a, #020617);
}

.done-bg {
  background: radial-gradient(circle, #052e16, #020617);
}

.join-form {
  display: flex;
  gap: 10px;
}

.join-input::placeholder {
  color: #4467c9;
  opacity: 0.4;
  font-family: 'Audiowide', sans-serif;
}

.join-input:focus {
  outline: #e9edf9;
  box-shadow:
    0 0 14px #5a99ff,
    0 0 30px #486ed7;
}

.join-input {
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-family: 'Audiowide', sans-serif;
  background: #0e131c;
  box-shadow:
    0 0 14px #3b82f6,
    0 0 30px #1d4ed8;
  color: #4467c9;
}

.join-btn {
  background: #0e131c;
  color: rgb(72, 104, 199);
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Audiowide', sans-serif;
  box-shadow:
    0 0 14px #3b82f6,
    0 0 30px #1d4ed8;
}

.join-btn:hover {
  transform: translateY(-1px) scale(1.03);
  box-shadow:
    0 0 20px #3b82f6,
    0 0 40px #1d4ed8;
}

.join-btn:active {
  transform: scale(0.96);
}

input {
  padding: 10px;
  border-radius: 8px;
  border: none;
}

button {
  cursor: pointer;
  font-family: inherit;
}

.game {
  text-align: center;
  color: #e5e7eb;
}

.task-btn {
  font-size: 2rem;
  padding: 40px 60px;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  margin-top: 20px;
  background: #0e131c;
}

.task-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.done-btn {
  color: #22c5af;
  box-shadow:
    0 0 10px #22c5af,
    0 0 20px #4adea8;
}

.done-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow:
    0 0 14px #22c5af,
    0 0 30px #4adea8;
}

.pending-btn {
  color: #c13bf6;
  box-shadow:
    0 0 10px #c13bf6,
    0 0 20px #de60fa;
}

.pending-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow:
    0 0 14px #c13bf6,
    0 0 30px #de60fa;
}

.gradient-done {
  background: linear-gradient(90deg, #22c5af, #4adea8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow:
    0 0 8px #22c5af,
    0 0 16px #4adea8;
}

.gradient-pending {
  background: linear-gradient(90deg, #c13bf6, #de60fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow:
    0 0 8px #c13bf6,
    0 0 16px #de60fa;
}

.gradient-text {
  background: linear-gradient(90deg, #2238c5, #4a59de);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow:
    0 0 8px #2238c5,
    0 0 16px #4a59de;
}

.timer {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.alert {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #22c55e;
  color: black;
  padding: 16px 24px;
  border-radius: 12px;
  font-weight: bold;
  z-index: 1000;
}
</style>
