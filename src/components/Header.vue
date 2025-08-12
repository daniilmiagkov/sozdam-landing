<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const items = [
  { text: 'Актуальность', link: 'relevance' },
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  z-index: var(--z-header);
  display: flex;
  align-items: center;
  padding: 0 var(--container-padding);
  box-shadow: var(--shadow-sm);
}

.nav {
  width: min(1200px, 100%);
  margin: 0 auto;
}

.list {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
  margin: 0;
  padding: 10px;
  list-style: none;

  @media (max-width: 640px) {
    gap: var(--space-sm);
    flex-wrap: wrap;
  }
}

.item {
  position: relative;

  &.active::after {
    content: '';
    position: absolute;
    bottom: calc(-1 * var(--space-xs));
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-accent);
    transition: opacity var(--transition-fast);
  }
}

.link {
  display: block;
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-secondary);
  transition: color var(--transition-fast);
  white-space: nowrap;

  &:hover {
    color: var(--color-accent);
  }

  @media (max-width: 640px) {
    padding: 0.375rem;
  }
}
</style>
