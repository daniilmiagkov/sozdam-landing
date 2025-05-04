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
  <section :id="id">
    <h3>Команда</h3>
    <div :class="$style.content">
      <div
        v-for="human in people"
        :key="human.name"
        :class="$style.human"
      >
        <div v-html=" human.text" />
        <img
          :src="`${human.name}.jpg`"
          alt=""
        >
      </div>
    </div>
  </section>
</template>

<style module lang="scss">
.content {
  text-align: justify;
  display: flex;
  gap: 64px;
  flex-direction: column;
}

.human {
  display: flex;
  gap: 30px;
  align-content: flex-start;

  p {
    padding: 0;
    margin: 0;
  }

  img {
    object-fit: cover;
    flex-shrink: 0 1 auto;
    max-height: 250px;
    aspect-ratio: 3/4;
  }
}
</style>
