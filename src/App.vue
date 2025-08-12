<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import ArchitectureSection from './components/sections/Architecture.vue'
import DatasetSection from './components/sections/Dataset.vue'
import DemoSection from './components/sections/Demo.vue'
import RelevanceSection from './components/sections/Relevance.vue'
import TeamSection from './components/sections/Team.vue'

const route = useRoute()
const currentSection = ref(route.hash.replace('#', '') || 'relevance')

watch(() => route.hash, (newHash) => {
  currentSection.value = newHash.replace('#', '') || 'relevance'
})
</script>

<template>
  <div :class="$style.app">
    <Header />
    <main :class="$style.main">
      <RelevanceSection v-show="currentSection === 'relevance'" />
      <ArchitectureSection v-show="currentSection === 'architecture'" />
      <DatasetSection v-show="currentSection === 'dataset'" />
      <TeamSection v-show="currentSection === 'team'" />
      <DemoSection v-show="currentSection === 'demo'" />
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
