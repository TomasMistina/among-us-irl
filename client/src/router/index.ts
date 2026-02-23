import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Host from '../views/Host.vue'
import Join from '../views/Join.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/host', component: Host },
    { path: '/join', component: Join },
  ],
})
