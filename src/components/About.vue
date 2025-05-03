<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

defineProps<{
  id: string
}>()

const names = [
  'about_lead',
  'about_miagkov',
  'about_pasha',
]

const people = ref<{
  name: string
  text: string
}[]>([])

onMounted(async () => {
  for (const name of names) {
    const res = await fetch(`/${name}.md`)
    const rawMarkdown = await res.text()
    const html = await marked(rawMarkdown)
    people.value.push({
      text: DOMPurify.sanitize(html),
      name,
    })
  }
})
</script>

<template>
  <section
    :id="id"
    :class="$style.section"
  >
    <h3>Команда</h3>
    <div
      v-for="human in people"
      :key="human.name"
      :class="$style.human"
    >
      <img
        :src="human.name"
        alt=""
      >
      <p v-html=" human.text" />
    </div>
  </section>
</template>

<style module>
.section {
  text-align: justify;
}

.human {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>
