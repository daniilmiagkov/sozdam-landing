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
    <Progress :class="$style.progress" />
  </div>
</template>

<style module lang="scss">
.menu {
  display: flex;
  gap: 20px;
  max-width: 250px;
  align-items: center;
}

.list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.item {
  margin-bottom: 12px;
  border-radius: 8px;
}

.active {
  background-color: #ceecf5;
}

.link {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  padding: 10px 16px;
  border-radius: 4px;
  display: block;
  transition: all 0.3s ease;
  cursor: pointer;
}

.link:hover {
  background-color: #ceecf5;
  color: #333;
}

.link:active {
  color: #333;
}
</style>
