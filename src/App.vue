<script setup lang="ts">
import BackgroundCubes from './components/effects/BackgroundCubes.vue'
import Header from './components/Header.vue'
</script>

<template>
  <div :class="$style.app">
    <BackgroundCubes />
    <Header />
    <main :class="$style.main">
      <router-view />
    </main>
  </div>
</template>

<style module lang="scss">
.app {
  min-height: 100vh;
  width: 100%;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  // backdrop-filter: blur(1px);
  // backdrop-filter: opacity(90%);
}
</style>
