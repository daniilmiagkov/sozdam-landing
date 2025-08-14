<script setup lang="ts">
</script>

<template>
  <section
    id="demo"
    :class="$style.section"
  >
    <h1>Демо</h1>

    <video
      src="/2025-08-14 11-42-33.mp4"
      controls
      :class="$style.demoVideo"
    >
      Ваш браузер не поддерживает видео HTML5.
    </video>
  </section>
</template>

<style module lang="scss">
.section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  padding: var(--section-padding);
  padding-top: calc(var(--header-height) + var(--section-padding));

  text-align: center;

  h1 {
    font-size: var(--font-size-2xl);
    color: var(--color-primary);
    margin-bottom: var(--space-lg);
  }

  h2 {
    font-size: var(--font-size-xl);
    color: var(--color-secondary);
    margin-bottom: var(--space-md);
  }
}

.mainDemo {
  width: 100%;
  max-width: min(90vw, 900px);
  margin: 0 auto;
}

.demoVideo {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.features {
  width: 100%;
  max-width: min(90vw, 800px);
  margin: 0 auto;

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    gap: var(--space-md);
    list-style: none;
    padding: 0;

    li {
      padding: var(--space-md);
      background: var(--color-surface);
      border-radius: var(--radius-sm);
      transition: transform var(--transition-fast);
      box-shadow: var(--shadow-sm);
    }
  }
}

.howTo {
  width: 100%;
  max-width: min(90vw, 800px);
  margin: 0 auto;

  ol {
    counter-reset: step;
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: calc(var(--space-xl) + var(--space-xs));
      margin-bottom: var(--space-md);

      &:last-child {
        margin-bottom: 0;
      }

      &::before {
        counter-increment: step;
        content: counter(step);
        position: absolute;
        left: 0;
        top: 0.2rem;
        width: 1.5rem;
        height: 1.5rem;
        background: var(--color-accent);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
      }
    }
  }
}
</style>
