<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import ArchitectureSection from './components/sections/Architecture.vue'
import DatasetSection from './components/sections/Dataset.vue'
import DemoSection from './components/sections/Demo.vue'
import RelevanceSection from './components/sections/Relevance.vue'
import TeamSection from './components/sections/Team.vue'

const route = useRoute()
const router = useRouter()

const sections = ['relevance', 'architecture', 'dataset', 'team', 'demo']

const currentSection = ref('relevance')

// Функция установки секции и корректного хэша
function updateSection(hash: string) {
  const cleanHash = hash.replace('#', '')
  if (sections.includes(cleanHash)) {
    currentSection.value = cleanHash
  }
  else {
    currentSection.value = 'relevance'
    // обновляем URL без перезагрузки страницы
    router.replace({ path: route.path, hash: '#relevance' })
  }
}

watch(() => route.hash, (newHash) => {
  updateSection(newHash)
})

onMounted(() => {
  updateSection(route.hash)
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
  max-width: 1000px;
  margin: 0 auto;
}
</style>
