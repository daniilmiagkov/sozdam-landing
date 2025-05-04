<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMotionValueEvent, useScroll } from 'motion-v'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'

const { scrollYProgress } = useScroll()

const progress = ref(0)

onMounted(() => {
  progress.value = scrollYProgress.get()
  console.log('onMounted, initial scrollYProgress:', progress.value)
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

<style module>
.ProgressRoot {
  position: relative;
  overflow: hidden;
  background: #eee;
  border-radius: 9999px;

  /* Высота вертикального прогресс-бара */
  width: 5px;
  height: 100px;

  /* Сбрасываем 3D трансформацию */
  transform: translateZ(0) rotateX(180deg);
}

.ProgressIndicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: black;
  /* transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1); */

  /* Начальное положение будет изменяться по Y */
  transform: translateY(100%);
}
</style>
