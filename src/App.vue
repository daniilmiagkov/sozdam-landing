<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <div :class="$style.app">
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
}
</style>
