<script setup lang="ts">
import { computed, ref } from 'vue'
import { Menu, X } from 'lucide-vue-next' // иконки бургер и крестик
import { useRoute } from 'vue-router'

const items = [
  { text: 'Актуальность', link: 'relevance' },
  { text: 'Архитектура', link: 'architecture' },
  { text: 'Датасет', link: 'dataset' },
  { text: 'О нас', link: 'team' },
  { text: 'Демо', link: 'demo' },
]

const route = useRoute()
const activeLink = computed(() => route?.hash?.replace('#', '') || '')

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
</script>

<template>
  <header :class="$style.header">
    <nav :class="$style.nav">
      <!-- Бургер для мобилки -->
      <button
        :class="$style.burger"
        aria-label="Меню"
        @click="toggleMenu"
      >
        <Menu
          v-if="!isMenuOpen"
          :size="24"
        />
        <X
          v-else
          :size="24"
        />
      </button>

      <!-- Список меню -->
      <ul
        :class="[
          $style.list,
          isMenuOpen && $style.open,
        ]"
      >
        <li
          v-for="item in items"
          :key="item.link"
          :class="[
            $style.item,
            item.link === activeLink && $style.active,
          ]"
          @click="isMenuOpen = false"
        >
          <a
            :href="`#${item.link}`"
            :class="$style.link"
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
  background: rgba(255, 255, 255);
  z-index: var(--z-header);
  padding: 0 var(--container-padding);
  height: var(--header-height);
  display: flex;
}

.nav {
  width: min(1200px, 100%);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (min-width: 641px) {
  .nav {
    justify-content: center;
  }
}

.burger {
  display: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  @media (max-width: 640px) {
    display: block;
  }
}

.list {
  display: flex;
  gap: var(--space-lg);
  margin: 0;
  padding: 10px;
  list-style: none;

  @media (max-width: 640px) {
    position: absolute;
    top: var(--header-height);
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    transform: translateY(-150%);
    transition: transform 0.3s ease;
    box-shadow: var(--shadow-md);
  }
}

.open {
  @media (max-width: 640px) {
    transform: translateY(0);
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
}
</style>
