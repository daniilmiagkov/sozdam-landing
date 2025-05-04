<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMotionValueEvent, useScroll } from 'motion-v'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'

const { scrollYProgress } = useScroll()

const progress = ref(0)

onMounted(() => {
  progress.value = scrollYProgress.get()
})

let initialized = false

useMotionValueEvent(scrollYProgress, 'change', (latest) => {
  if (!initialized) {
    initialized = true
    return
  }
  progress.value = latest * 100
})
</script>

<template>
  <ProgressRoot
    :value="progress"
    :class="$style.ProgressRoot"
  >
    <ProgressIndicator
      :class="$style.ProgressIndicator"
      :style="`transform: translateY(${100 - progress}%);`"
    />
  </ProgressRoot>
</template>

<style module lang="scss">
$color: rgba(201, 201, 201, 0.425);

.ProgressRoot {
  position: relative;
  overflow: hidden;
  border-radius: 9999px;
  border: $color 2px solid;
  width: 5px;
  height: 100px;

  transform: translateZ(0) rotateX(180deg);
}

.ProgressIndicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: $color;

  transform: translateY(100%);
}
</style>
