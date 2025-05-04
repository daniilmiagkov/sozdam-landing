<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import Menu from './components/Menu.vue'
import Section from './components/Section.vue'
import About from './components/About.vue'

// Конфиг секций
const sections = [
  { text: 'Проект', link: 'project' },
  { text: 'О нас',   link: 'about'   },
]

const projectEl = useTemplateRef<HTMLElement>('project')
const aboutEl   = useTemplateRef<HTMLElement>('about')

const currentIndex = ref(0)

useIntersectionObserver(
  projectEl,
  ([{ isIntersecting, intersectionRatio }]) => {
    if (isIntersecting && intersectionRatio >= 0.5) {
      currentIndex.value = 0
      history.replaceState({}, '', '#project')
    }
  },
  { threshold: 0.5 }
)

useIntersectionObserver(
  aboutEl,
  ([{ isIntersecting, intersectionRatio }]) => {
    if (isIntersecting && intersectionRatio >= 0.5) {
      currentIndex.value = 1
      history.replaceState({}, '', '#about')
    }
  },
  { threshold: 0.5 }
)
</script>


<template>
  <div :class="$style.app">
    <Menu
      :items="sections"
      :class="$style.menu"
    />

    <div  />

    <div :class="$style.content">
      <Section id="project" ref="project" />
      <About id="about" ref="about" />
    </div>

    <div />
  </div>
</template>

<style module>
html {
  scroll-behavior: smooth;
}
.app {
  display: grid;
  grid-template-columns: 100px 600px 100px;
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
