import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from './App.vue'
import ArchitectureSection from './components/sections/Architecture.vue'
import DatasetSection from './components/sections/Dataset.vue'
import DemoSection from './components/sections/Demo.vue'
import RelevanceSection from './components/sections/Relevance.vue'
import TeamSection from './components/sections/Team.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', redirect: '/relevance' },
      { path: 'relevance', component: RelevanceSection },
      { path: 'architecture', component: ArchitectureSection },
      { path: 'dataset', component: DatasetSection },
      { path: 'team', component: TeamSection },
      { path: 'demo', component: DemoSection },
    ],
  },

  { path: '/:catchAll(.*)', redirect: '/relevance' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
