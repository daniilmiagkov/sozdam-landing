<script setup lang="ts">
import Progress from './Progress.vue'

defineProps<{
  items: { text: string, link: string }[]
}>()
</script>

<template>
  <div :class="$style.menu">
    <ul :class="$style.list">
      <li
        v-for="item in items"
        :key="item.link"
        :class="$style.item"
      >
        <a
          :class="$style.link"
          :href="`#${item.link}`"
        >{{ item.text }}</a>
      </li>
    </ul>
    <Progress :class="$style.progress" />
  </div>
</template>

<style module>
.menu {
  display: flex;
}

.progress {
  /* width: 100%; */
  /* height: 20px; */
}

.list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.item {
}

.link {
}
</style>
