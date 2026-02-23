<template>
  <div class="host">
    <h2>Session: {{ store.sessionId }}</h2>

    <div class="controls">
      <button v-if="!store.gameStarted" class="start" @click="store.startGame">Spustiť hru</button>
      <button v-else class="end" @click="store.endGame">Ukončiť hru</button>
      <GameTimer />
    </div>

    <div class="grid">
      <div
        v-for="(status, user) in store.tasks"
        :key="user"
        class="card"
        :class="status ? 'done' : 'pending'"
      >
        <h3>{{ user }}</h3>
        <p>{{ status ? 'Úloha splnená' : 'Úloha nie je splnená' }}</p>
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
const store = useSessionStore()
</script>

<style scoped>
.host {
  padding: 30px;
  color: #e5e7eb;
}

.controls {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}

.start {
  background: #22c55e;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  font-family: inherit;
}

.end {
  background: #ef4444;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  font-family: inherit;
}

.timer {
  font-size: 1.2rem;
  font-weight: bold;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.card {
  border-radius: 20px;
  padding: 20px;
  border: 3px solid;
  text-align: center;
}

.card.done {
  border-color: #22c55e;
  color: #22c55e;
}

.card.pending {
  border-color: #ef4444;
  color: #ef4444;
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
</style>
