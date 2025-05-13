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
}

.active {
  background-color: red($color: #000000);
}

.item {
  border-radius: 8px;

  .link {
    text-decoration: none;
    font-size: 16px;
    padding: 4px 16px;
    border-radius: 8px;

    text-align: left;
    color: #5f5f5f;

    display: block;
    cursor: pointer;
  }

  &.active .link {
    color: #252525;
  }
}

.link:hover {
  color: #808080;
}

.link:active {
  color: #788e9b;
}
</style>
