<script setup lang="ts">
// Пустой setup
</script>

<template>
  <section
    id="demo"
    :class="$style.section"
  >
    <h1>Демо</h1>

    <!-- <video
      src="/demo.mp4"
      controls
      :class="$style.demoVideo"
    >
      Ваш браузер не поддерживает видео HTML5.
    </video> -->
  </section>
</template>

<style module lang="scss">
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.demoVideo {
  width: 100%;
  max-width: 900px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
