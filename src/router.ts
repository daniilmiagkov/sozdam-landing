// router.ts
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  { path: '/', component: App },
]

const router = createRouter({
  history: createWebHistory(), // <-- здесь
  routes,
  scrollBehavior(to, from) {
    // Если переход осуществляется с использованием router.replace и содержит хэш
    if (to.hash && from.path === to.path) {
      // Не выполняем прокрутку
      return false
    }

    // Обычное поведение прокрутки
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
})

export default router
