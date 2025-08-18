<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const container = ref(null)
let ctx = null

onMounted(() => {
  if (!container.value)
    return

  ctx = gsap.context(() => {
    const pinTargets = Array.from(container.value.querySelectorAll('.panel'))

    pinTargets.forEach((panel) => {
      // анимация появления
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: 0, x: 0 },
        {
          autoAlpha: 1,
          y: 0,
          x: 200,
          // duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            start: `top 20%`,
            end: 'bottom 20%',
            pin: true,
            // pinSpacing: true,
            markers: true,
            toggleActions: 'restart play play reverse',
          },
        },

      )
    })
    ScrollTrigger.refresh()
  }, container.value)
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
  ScrollTrigger.getAll().forEach(t => t.kill())
  gsap.killTweensOf('*')
})
</script>

<template>
  <div class="app">
    <div
      ref="container"
      class="container"
    >
      <div class="spacer" />

      <section
        v-for="n in 4"
        :key="n"
        class="panel"
      >
        <div class="inner">
          {{ i }}
        </div>
      </section>
      <!-- <div class="panel" /> -->
      <div class="spacer" />
    </div>
    <!-- <div class="spacer" /> -->
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding-top: var(--header-height); /* чтобы первый блок не уехал под header */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.panel {
  position: relative;
  border-radius: 8px;
  padding-bottom: 20px;
  height: 1000px;
  width: 100px;
}

.inner {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  height: 40px;
}

.spacer {
  height: 500px;
}
</style>
