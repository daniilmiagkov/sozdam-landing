<script setup lang="ts">
import About from './components/About.vue'
import Menu from './components/Menu.vue'
import Section from './components/Section.vue'

const sections = [
  { text: 'Проект', link: 'project' },
  { text: 'О нас', link: 'about' },
]
</script>

<template>
  <div :class="$style.app">
    <Menu
      :items="sections"
      :class="$style.menu"
    />

    <div :class="$style.spacer" />

    <div :class="$style.content">
      <Section id="project" />
      <About id="about" />
    </div>

    <div :class="$style.spacer" />
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

.spacer {
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 60px;
}
</style>
