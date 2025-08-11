<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const items = [
  { text: 'Зачем?', link: 'relevance' },
  { text: 'Архитектура', link: 'architecture' },
  { text: 'Датасет', link: 'dataset' },
  { text: 'О нас', link: 'team' },
  { text: 'Демо', link: 'demo' },
]

const route = useRoute()
const activeLink = computed(() => {
  return route?.hash?.replace('#', '') || ''
})
</script>

<template>
  <header :class="$style.header">
    <nav :class="$style.nav">
      <ul :class="$style.list">
        <li
          v-for="item in items"
          :key="item.link"
          :class="[
            $style.item,
            item.link === activeLink && $style.active,
          ]"
        >
          <a
            :class="$style.link"
            :href="`#${item.link}`"
          >{{ item.text }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style module lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 100;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
}

.list {
  list-style: none;
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.item {
  position: relative;

  &.active {
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: currentColor;
    }
  }
}

.link {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  color: #525252;

  &:hover {
    color: #666;
  }
}
</style>
