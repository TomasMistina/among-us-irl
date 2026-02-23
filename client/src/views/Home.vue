<script setup>
import { useSessionStore } from '../stores/session'
import { useRouter } from 'vue-router'

const store = useSessionStore()
const router = useRouter()

function host() {
  store.createSession()
  router.push('/host')
}

function join() {
  router.push('/join')
}
</script>

<template>
  <div class="home">
    <div class="card">
      <h1 class="title">AMONG US NAŽIVO</h1>
      <p class="subtitle">Monitoruj splnenie úloh v reálnom čase</p>

      <div class="buttons">
        <button class="btn host" @click="host">Vytvoriť novú hru</button>
        <button class="btn join" @click="join">Pripojiť sa k hre</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Page background */
.home {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, #1e293b, #020617);
  color: white;
  font-family: 'Audiowide', sans-serif;
}

/* Center card */
.card {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 48px 40px;
  text-align: center;
  box-shadow:
    0 0 25px rgba(34, 197, 94, 0.15),
    0 0 80px rgba(0, 0, 0, 0.6);
  width: 320px;
}

/* Title */
.title {
  font-size: 2.4rem;
  margin-bottom: 10px;
  color: #22c55e;
  text-shadow:
    0 0 6px #22c55e,
    0 0 14px #16a34a;
}

/* Subtitle */
.subtitle {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 30px;
}

/* Buttons layout */
.buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Base button */
.btn {
  border: none;
  border-radius: 14px;
  padding: 14px 18px;
  font-size: 1rem;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.5px;
}

/* Host button (green glow) */
.host {
  background: #22c55e;
  color: black;
  box-shadow:
    0 0 10px #22c55e,
    0 0 20px #16a34a;
}

.host:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow:
    0 0 14px #22c55e,
    0 0 30px #16a34a;
}

/* Join button (blue glow) */
.join {
  background: #3b82f6;
  color: white;
  box-shadow:
    0 0 10px #3b82f6,
    0 0 20px #1d4ed8;
}

.join:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow:
    0 0 14px #3b82f6,
    0 0 30px #1d4ed8;
}

/* Press effect */
.btn:active {
  transform: scale(0.96);
}
</style>
