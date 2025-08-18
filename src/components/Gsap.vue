<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useCssModule } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAutoStagger } from '../composables/useAutoStagger'

gsap.registerPlugin(ScrollTrigger)

const root = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const classes = useCssModule()

useAutoStagger(root, {
  selector: '.fadeInUp',
  base: 0.08,
  step: 0.16,
  observe: true,
  startOnView: false,
})

onMounted(() => {
  if (!container.value)
    return

  ctx = gsap.context(() => {
    // строго типизируем
    const pinTargets = Array.from(
      container.value!.getElementsByClassName(classes.step),
    ) as HTMLElement[]

    console.log(pinTargets)

    pinTargets.forEach((panel) => {
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: 0, x: -500, rotate: -10 },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          rotate: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            start: `200px 35%`,
            end: '+=600px 0%',
            pin: true,
            pinSpacing: true,
            markers: true,
            scrub: false,
            toggleActions: 'restart play play reverse',
          },
        },
      )
    })
    ScrollTrigger.refresh()
  }, container.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ScrollTrigger.getAll().forEach(t => t.kill())
  gsap.killTweensOf('*')
})

const modules = [
  {
    title: 'ASR',
    description: 'Модуль распознавания речи. Обрабатывает аудио в реальном времени: шумоподавление, буферизация, потоковое преобразование речи в текст.',
  },
  {
    title: 'NLP',
    description: 'Модуль обработки естественного языка. Анализирует текст, выделяет медицинские сущности: жалобы, анамнез болезни, анамнез жизни, результаты осмотра.',
  },
  {
    title: 'Структурирование',
    description: 'Модуль структурирования данных. Формирует из выделенных сущностей стандартные фрагменты медицинской документации. Обеспечивает автозаполнение и подготовку к подтверждению.',
  },
  {
    title: 'Форма / Экспорт',
    description: 'Модуль формы и экспорта. Предоставляет врачу удобный интерфейс для правок, подтверждения информации и экспорта в ЭМИС.',
  },
]
</script>

<template>
  <section
    ref="root"
    :class="$style.section"
  >
    <div :class="$style.lead">
      <h1
        :class="[$style.title]"
        class="fadeInUp"
      >
        Архитектура
      </h1>
      <p class="fadeInUp">
        Система разделена на независимые модули, каждый отвечает за отдельный этап обработки данных.
        Такое разделение облегчает разработку, тестирование и масштабирование.
      </p>
    </div>

    <div
      ref="container"
      :class="$style.container"
    >
      <!-- <div :class="$style.spacer" /> -->

      <div :class="$style.flow">
        <div
          v-for="(m, i) in modules"
          :key="m.title"
          :class="[$style.step]"
        >
          <div :class="$style.left">
            <!-- Анимированный блок -->
            <div :class="$style.block">
              <div :class="$style.blockInner">
                <span>{{ m.title }}</span>
              </div>
              <div :class="$style.blockHoverEffect" />
            </div>

            <!-- Анимированная стрелка -->
            <div
              v-if="i < modules.length - 1"
              :class="$style.arrow"
            >
              <div :class="$style.arrowLine" />
              <div :class="$style.arrowHead" />
            </div>
          </div>

          <div :class="$style.right">
            {{ m.description }}
          </div>
        </div>
      </div>
      <div :class="$style.spacer" />
    </div>
    <!-- <div :class="$style.spacer" /> -->
  </section>
</template>

<style lang="scss" module>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding-top: var(--header-height); /* чтобы первый блок не уехал под header */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.spacer {
  height: 500px;
}

@keyframes flowLine {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(300%);
    opacity: 0;
  }
}

.section {
  min-height: 100vh;
  padding: var(--section-padding);
  padding-top: calc(var(--header-height) + var(--section-padding));
  position: relative;
}

.title {
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
  margin-bottom: var(--space-lg);
  text-align: center;
  position: relative;
}

.lead {
  position: sticky;
  top: var(--header-height);
  z-index: 10;
  background: white;
  p {
    max-width: min(800px, 95%);
    margin: 0 auto var(--space-xl);
    color: var(--color-secondary);
    font-size: var(--font-size-lg);
    line-height: 1.6;
    text-align: center;
  }
}

.step {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'left right';
  align-items: start;
  gap: var(--space-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'right'
      'left';
    gap: var(--space-md);
    text-align: center;
  }
  // height: 300px;
}

.flow {
  max-width: min(1000px, 95%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  position: relative;
  z-index: 2;
}

.left {
  grid-area: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.block {
  width: 180px;
  height: 60px;
  position: relative;
  perspective: 1000px;

  &Inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
    background: linear-gradient(145deg, #ffffff, #f0f9ff);
    border-radius: 10px;
    box-shadow:
      0 4px 20px rgba(99, 102, 241, 0.1),
      0 0 0 1px rgba(209, 213, 219, 0.5);
    padding: 0 20px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 2;
    overflow: hidden;
    font-weight: 600;
    color: var(--color-primary);
  }
}
.arrow {
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 5px 0;
}

.arrowLine {
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #93c5fd, #bfdbfe);
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.arrowLine::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(20px + 14px); // 14px — высота стрелки
  background: linear-gradient(to bottom, #3b82f6, #60a5fa);
  animation: flowLine 1.5s infinite ease-in-out;
}

.arrowHead {
  width: 14px;
  height: 14px;
  background: #3b82f6;
  clip-path: polygon(50% 0%, /* верхняя точка */ 100% 100%, /* правый нижний угол */ 0% 100% /* левый нижний угол */);
  border-radius: 2px; /* закругляем угол */
  transform: rotate(180deg); /* если нужно вниз */
}

.right {
  grid-area: right;
  font-size: var(--font-size-base);
  color: var(--color-secondary);
  line-height: 1.6;
  text-align: left;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 12px;
  padding: var(--space-md);
  border: 1px solid rgba(209, 213, 219, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    text-align: center;
  }
}
</style>
