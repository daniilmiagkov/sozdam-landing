<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

defineProps<{
  id: string
}>()

const text = ref<string>()

onMounted(async () => {
  const res = await fetch('/project.md')
  const rawMarkdown = await res.text()
  const html = await marked(rawMarkdown)
  text.value = DOMPurify.sanitize(html)
})
</script>

<template>
  <section
    :id="id"
    :class="$style.section"
    v-html="text"
  />
</template>

<style module>
.section {
  text-align: justify;
}
</style>
