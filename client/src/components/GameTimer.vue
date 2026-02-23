<script setup>
import { computed, watch, ref } from 'vue'
import { useSessionStore } from '../stores/session'

const store = useSessionStore()

// Reactive local time to trigger updates every second
const elapsed = ref(store.elapsedTime)

// Watch the store's elapsedTime
watch(
  () => store.elapsedTime,
  (newVal) => {
    elapsed.value = newVal
  },
)

// Format mm:ss
const formattedTime = computed(() => {
  const totalSeconds = elapsed.value
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')

  return `${mm}:${ss}`
})

// Dynamic classes for alerts
const timerClass = computed(() => ({
  'digital-timer': true,
  alert: store.alertMessage !== '',
}))
</script>

<template>
  <div v-if="store.gameStarted && store.elapsedTime > 0" :class="timerClass">
    {{ formattedTime }}
  </div>
</template>

<style scoped>
.digital-timer {
  font-family: 'Orbitron', monospace;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #22c55e; /* neon green */
  text-shadow:
    0 0 5px #22c55e,
    0 0 10px #16a34a;
  text-align: center;
}
</style>
