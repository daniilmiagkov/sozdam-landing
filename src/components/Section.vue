<script setup lang="ts">
defineProps<{
  id: string
  header?: string
  text: string
}>()
</script>

<template>
  <section
    :id="id"
    :class="$style.section"
  >
    <h3>{{ header }}</h3>
    {{ text }}
  </section>
</template>

<style module>
.section {
  background-color: beige;
}
</style>
