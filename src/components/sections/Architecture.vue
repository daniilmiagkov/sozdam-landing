<script setup lang="ts">
const modules = [
  {
    title: 'ASR',
    description:
      'Модуль распознавания речи. Обрабатывает аудио в реальном времени: шумоподавление, буферизация, потоковое преобразование речи в текст.',
  },
  {
    title: 'NLP',
    description:
      'Модуль обработки естественного языка. Анализирует текст, выделяет медицинские сущности: жалобы, анамнез болезни, анамнез жизни, результаты осмотра.',
  },
  {
    title: 'Структурирование',
    description:
      'Модуль структурирования данных. Формирует из выделенных сущностей стандартные фрагменты медицинской документации. Обеспечивает автозаполнение и подготовку к подтверждению.',
  },
  {
    title: 'Форма / Экспорт',
    description:
      'Модуль формы и экспорта. Предоставляет врачу удобный интерфейс для правок, подтверждения информации и экспорта в ЭМИС.',
  },
]
</script>

<template>
  <section :class="$style.section">
    <h1>Архитектура</h1>
    <p :class="$style.lead">
      Система разделена на независимые модули, каждый отвечает за отдельный этап обработки данных.
      Такое разделение облегчает разработку, тестирование и масштабирование.
    </p>

    <div :class="$style.flow">
      <div
        v-for="(m, i) in modules"
        :key="m.title"
        :class="$style.step"
      >
        <div :class="$style.left">
          <!-- Блок -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="50"
          >
            <rect
              x="10"
              y="5"
              width="180"
              height="40"
              rx="6"
              fill="#f9fafb"
              stroke="#9ca3af"
              stroke-width="1.5"
            />
            <text
              x="100"
              y="25"
              text-anchor="middle"
              dominant-baseline="middle"
              font-size="16"
              fill="#374151"
            >
              {{ m.title }}
            </text>
          </svg>

          <!-- Стрелка -->
          <svg
            v-if="i < modules.length - 1"
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="30"
          >
            <line
              x1="100"
              y1="0"
              x2="100"
              y2="20"
              stroke="#9ca3af"
              stroke-width="2"
              marker-end="url(#arrow)"
            />
            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path
                  d="M0,0 L0,6 L9,3 z"
                  fill="#9ca3af"
                />
              </marker>
            </defs>
          </svg>
        </div>

        <div :class="$style.right">
          {{ m.description }}
        </div>
      </div>
    </div>
  </section>
</template>

<style module lang="scss">
.section {
  min-height: 100vh;
  padding: var(--section-padding);
  padding-top: calc(var(--header-height) + var(--section-padding));

  h1 {
    font-size: var(--font-size-2xl);
    color: var(--color-primary);
    margin-bottom: var(--space-lg);
    text-align: center;
  }
}

.lead {
  max-width: min(800px, 95%);
  margin: 0 auto var(--space-xl);
  color: var(--color-secondary);
  font-size: var(--font-size-lg);
  line-height: 1.6;
  text-align: center;
}

.flow {
  max-width: min(1000px, 95%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.step {
  display: flex;
  align-items: flex-start;
  gap: var(--space-lg);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-md);
  }
}

.left {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);

  svg {
    transition: transform var(--transition-normal);

    &:hover {
      transform: scale(1.05);
    }

    rect {
      fill: var(--color-surface);
      stroke: var(--color-border);
      transition: all var(--transition-normal);
    }

    text {
      fill: var(--color-primary);
      font-weight: 500;
    }

    &:hover rect {
      fill: var(--color-background);
      stroke: var(--color-accent);
    }
  }
}

.right {
  flex: 1;
  font-size: var(--font-size-base);
  color: var(--color-secondary);
  line-height: 1.6;
  text-align: justify;

  @media (max-width: 768px) {
    text-align: center;
  }
}
</style>
