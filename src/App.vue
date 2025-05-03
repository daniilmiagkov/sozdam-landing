<script setup lang="ts">
import Menu from './components/Menu.vue'
import Section from './components/Section.vue'

const menuItems: { text: string, link: string }[] = [
  {
    text: 'Проект',
    link: 'project',
  },
  {
    text: 'О нас',
    link: 'about',
  },
]
</script>

<template>
  <Teleport to="body">
    <Menu
      :items="menuItems"
      :class="$style.menu"
    />
  </Teleport>
  <div :class="$style.main">
    <Section
      id="project"
      header="Проект"
    />
  </div>
</template>

<style module>
html {
  scroll-behavior: smooth;
}

.main {
  height: 100vh;
  /* width: 100%; */
  max-width: 600px;
}

.menu {
  position: fixed;
  top: 100px;
  /* left: 40px; */
}
</style>
