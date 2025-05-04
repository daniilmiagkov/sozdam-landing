<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Progress from './Progress.vue'

defineProps<{
  items: { text: string, link: string }[]
}>()

const route = useRoute()
const activeLink = computed(() => {
  return route?.hash?.replace('#', '') || ''
})
</script>

<template>
  <div :class="$style.menu">
    <Progress :class="$style.progress" />

    <ul :class="$style.list">
      <li
        v-for="item in items"
        :key="item.link"
        :class="[
          $style.item,
          item.link === activeLink && $style.active,
        ]
        "
      >
        <a
          :class="$style.link"
          :href="`#${item.link}`"
        >{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<style module lang="scss">
$color: rgba(201, 201, 201, 0.425);

.menu {
  display: flex;
  gap: 10px;
  max-width: 250px;
  align-items: center;
}

.list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.active {
  background-color: $color;
}

.item {
  border-radius: 8px;
}

.link {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 8px;

  display: block;
  cursor: pointer;
}

.link:hover {
  background-color: $color;
  color: #333;
}

.link:active {
  color: #333;
}
</style>
