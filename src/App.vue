<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useRouter } from 'vue-router'
import About from './components/About.vue'
import Menu from './components/Menu.vue'
import Section from './components/Section.vue'

// Секции
const sections = [
  { text: 'Проект', link: 'project' },
  { text: 'О нас', link: 'about' },
]

const router = useRouter()
const currentIndex = ref(0)

// Шаблонные рефы
const projectEl = useTemplateRef<HTMLElement>('project')
const aboutEl = useTemplateRef<HTMLElement>('about')

onMounted(() => {
  // Когда в 50% видна "Проект"
  useIntersectionObserver(
    projectEl,
    ([{ isIntersecting, intersectionRatio }]) => {
      if (isIntersecting && intersectionRatio >= 0.5) {
        currentIndex.value = 0
        router.replace({ hash: '#project' }).catch(() => {})
      }
    },
    {
      threshold: 0.5,
    },
  )

  // Когда в 50% видна "О нас"
  useIntersectionObserver(
    aboutEl,
    ([{ isIntersecting, intersectionRatio }]) => {
      if (isIntersecting && intersectionRatio >= 0.5) {
        currentIndex.value = 1
        router.replace({ hash: '#about' }).catch(() => {})
      }
    },
    {
      threshold: 0.5,
    },
  )
})
</script>

<template>
  <div :class="$style.app">
    <Menu
      :items="sections"
      :class="$style.menu"
    />

    <div />

    <div :class="$style.content">
      <Section
        id="project"
        ref="project"
      />
      <About
        id="about"
        ref="about"
      />
    </div>

    <div />
  </div>
</template>

<style module>
.app {
  display: grid;
  grid-template-columns: 160px 600px 160px;
  margin: 64px auto;
}
.menu {
  position: fixed;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 60px;
}
</style>
