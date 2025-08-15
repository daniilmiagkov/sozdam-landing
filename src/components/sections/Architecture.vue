<script setup lang="ts">
import { onMounted, ref } from 'vue'

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

// Анимация появления элементов
const animated = ref(false)
onMounted(() => {
  animated.value = true
})
</script>

<template>
  <section :class="$style.section">
    <!-- Декоративные элементы -->
    <div :class="$style.decorCircle" />
    <div :class="$style.decorDots" />

    <h1 :class="[$style.title, { [$style.animated]: animated }]">
      Архитектура
    </h1>
    <p :class="[$style.lead, { [$style.animated]: animated }]">
      Система разделена на независимые модули, каждый отвечает за отдельный этап обработки данных.
      Такое разделение облегчает разработку, тестирование и масштабирование.
    </p>

    <div :class="$style.flow">
      <div
        v-for="(m, i) in modules"
        :key="m.title"
        :class="[$style.step, { [$style.animated]: animated }]"
        :style="{ animationDelay: `${i * 0.15}s` }"
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
  </section>
</template>

<style module lang="scss">
// Глобальные анимации
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes flowLine {
  0% {
    transform: translateY(-30px); // старт чуть выше блока
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100% + 30px)); // полностью вниз
    opacity: 0;
  }
}

.section {
  min-height: 100vh;
  padding: var(--section-padding);
  padding-top: calc(var(--header-height) + var(--section-padding));
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fbff 0%, #f0f9ff 100%);
}

// Декоративные элементы
.decorCircle {
  position: absolute;
  top: 10%;
  right: 10%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(164, 202, 254, 0.15), rgba(199, 230, 255, 0.1));
  filter: blur(40px);
  z-index: 0;
  animation: pulse 12s infinite ease-in-out;
}

.decorDots {
  position: absolute;
  bottom: 20%;
  left: 5%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(100, 116, 139, 0.1) 2px, transparent 3px);
  background-size: 30px 30px;
  opacity: 0.3;
  z-index: 0;
}

.title {
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
  margin-bottom: var(--space-lg);
  text-align: center;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.lead {
  max-width: min(800px, 95%);
  margin: 0 auto var(--space-xl);
  color: var(--color-secondary);
  font-size: var(--font-size-lg);
  line-height: 1.6;
  text-align: center;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease 0.1s,
    transform 0.6s ease 0.1s;
}

.title.animated,
.lead.animated {
  animation: fadeInUp 0.6s ease forwards;
}

.lead.animated {
  animation-delay: 0.1s;
}

.step {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'left right';
  align-items: start;
  gap: var(--space-lg);
  opacity: 0;
  transform: translateY(20px);

  &.animated {
    animation: fadeInUp 0.6s ease forwards;
  }
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
  cursor: pointer;

  &Inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
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
  padding: 20px;
  border: 1px solid rgba(209, 213, 219, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    text-align: center;
  }

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.1);
    border-color: rgba(165, 180, 252, 0.5);
  }
}
</style>
