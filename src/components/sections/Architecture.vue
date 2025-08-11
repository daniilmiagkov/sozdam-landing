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
  padding: 2rem;
}
.lead {
  color: #475569;
  margin-bottom: 1.5rem;
}
.flow {
  display: flex;
  flex-direction: column;
}
.step {
  display: flex;
  align-items: flex-start;
}
.left {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.right {
  flex: 1;
  padding-left: 1rem;
  color: #374151;
  line-height: 1.4;
  text-align: justify;
}
</style>
