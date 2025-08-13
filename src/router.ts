import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  { path: '/', component: App },
  { path: '/:catchAll(.*)', component: App }, // любой неизвестный путь ведёт на App
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    if (to.hash && from.path === to.path)
      return false
    if (to.hash)
      return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

// Всегда устанавливаем #relevance, если хэш пустой
router.beforeEach((to, from, next) => {
  if (!to.hash) {
    next({ path: to.path, hash: '#relevance' })
  }
  else {
    next()
  }
})

export default router
