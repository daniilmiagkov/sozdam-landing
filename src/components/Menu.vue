<script setup lang="ts">
defineProps<{
  items: { text: string, link: string }[]
}>()
</script>

<template>
  <ul>
    <li
      v-for="item in items"
      :key="item.link"
    >
      <a :href="item.link">{{ item.text }}</a>
    </li>
  </ul>
</template>

<style module>

</style>
