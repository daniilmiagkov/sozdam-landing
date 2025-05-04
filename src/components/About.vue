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
      <p v-html=" human.text" />
      <img
        :src="`${human.name}.jpg`"
        alt=""
      >
    </div>
  </section>
</template>

<style module lang="scss">
.section {
  text-align: justify;
  display: flex;
  gap: 30px;
  flex-direction: column;
}

.human {
  display: flex;
  gap: 30px;

  img {
    object-fit: cover;
    flex-shrink: 0 1 auto;
    max-width: 200px;
    aspect-ratio: 9/16;
  }
}
</style>
