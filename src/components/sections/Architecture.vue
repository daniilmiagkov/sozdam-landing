<script setup lang="ts">
import { ref } from 'vue'

const tooltipVisible = ref(false)
const tooltipText = ref('')
const tooltipX = ref(0)
const tooltipY = ref(0)

function onMouseEnter(event: MouseEvent, text: string) {
  tooltipText.value = text
  tooltipVisible.value = true
  updateTooltipPosition(event)
}

function updateTooltipPosition(event: MouseEvent) {
  tooltipX.value = event.clientX + 12
  tooltipY.value = event.clientY + 12
}

function onMouseMove(event: MouseEvent) {
  if (tooltipVisible.value) {
    updateTooltipPosition(event)
  }
}

function onMouseLeave() {
  tooltipVisible.value = false
}
</script>

<template>
  <section
    id="architecture"
    data-section="architecture"
    :class="$style.section"
  >
    <h1>Архитектура</h1>

    <p :class="$style.lead">
      Система разделена на независимые модули, каждый отвечает за отдельный этап обработки данных.
      Такое разделение облегчает разработку, тестирование и масштабирование.
    </p>

    <section :class="$style.diagram">
      <h3>Схема обработки данных</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 300"
        class="diagram-svg"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
      >
        <!-- Группы с обработчиками -->
        <g
          style="cursor: pointer;"
          @mouseenter="event => onMouseEnter(event, `Модуль распознавания речи (ASR). Обрабатывает аудио в реальном времени: шумоподавление, буферизация, потоковое преобразование речи в текст. Сокращает время врача на ведение документации.`)"
          @mouseleave="onMouseLeave"
        >
          <rect
            x="20"
            y="100"
            width="120"
            height="60"
            rx="8"
            fill="#e0f2fe"
            stroke="#0284c7"
          />
          <text
            x="80"
            y="130"
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="18"
            fill="#034172"
            pointer-events="none"
          >
            ASR
          </text>
        </g>

        <g
          style="cursor: pointer;"
          @mouseenter="event => onMouseEnter(event, `Модуль обработки естественного языка (NLP). Анализирует текст, выделяет медицинские сущности: жалобы, анамнез, симптомы, результаты осмотра. Нормализует термины, сопоставляет с клиническими справочниками.`)"
          @mouseleave="onMouseLeave"
        >
          <rect
            x="180"
            y="100"
            width="160"
            height="60"
            rx="8"
            fill="#fef9c3"
            stroke="#ca8a04"
          />
          <text
            x="260"
            y="130"
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="18"
            fill="#a07c0f"
            pointer-events="none"
          >
            NLP
          </text>
        </g>

        <g
          style="cursor: pointer;"
          @mouseenter="event => onMouseEnter(event, `Модуль структурирования данных. Формирует из выделенных сущностей стандартные фрагменты медицинской документации, например карту амбулаторного приема. Обеспечивает автозаполнение и подготовку к подтверждению.`)"
          @mouseleave="onMouseLeave"
        >
          <rect
            x="380"
            y="100"
            width="160"
            height="60"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
          />
          <text
            x="460"
            y="130"
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="18"
            fill="#166b24"
            pointer-events="none"
          >
            Структурирование
          </text>
        </g>

        <g
          style="cursor: pointer;"
          @mouseenter="event => onMouseEnter(event, `Модуль пользовательского интерфейса (UI). Предоставляет врачу удобный интерфейс для правок, подтверждения информации и экспорта в электронную медицинскую информационную систему (ЭМИС).`)"
          @mouseleave="onMouseLeave"
        >
          <rect
            x="580"
            y="100"
            width="160"
            height="60"
            rx="8"
            fill="#fce7f3"
            stroke="#be185d"
          />
          <text
            x="660"
            y="130"
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="18"
            fill="#7a1549"
            pointer-events="none"
          >
            UI / Экспорт
          </text>
        </g>

        <!-- Стрелки (сдвинуты, чтобы не заходили на блоки) -->
        <line
          x1="140"
          y1="130"
          x2="180"
          y2="130"
          stroke="#475569"
          stroke-width="2"
          marker-end="url(#arrow)"
        />
        <line
          x1="340"
          y1="130"
          x2="380"
          y2="130"
          stroke="#475569"
          stroke-width="2"
          marker-end="url(#arrow)"
        />
        <line
          x1="540"
          y1="130"
          x2="580"
          y2="130"
          stroke="#475569"
          stroke-width="2"
          marker-end="url(#arrow)"
        />

        <!-- Маркер стрелки -->
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
              fill="#475569"
            />
          </marker>
        </defs>
      </svg>

      <div
        v-if="tooltipVisible"
        :style="{
          position: 'fixed',
          top: `${tooltipY}px`,
          left: `${tooltipX}px`,
          backgroundColor: '#333',
          color: 'white',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '14px',
          maxWidth: '320px',
          pointerEvents: 'none',
          whiteSpace: 'normal',
          zIndex: 1000,
          userSelect: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }"
      >
        {{ tooltipText }}
      </div>

      <p :class="$style.hint">
        Здесь показан упрощённый конвейер: аудио проходит через распознавание речи, затем NLP, потом структурирование и экспорт.
      </p>
    </section>
  </section>
</template>

<style module lang="scss">
.section {
  padding: 2rem;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 6px 18px rgba(20, 30, 50, 0.04);
}
h1 {
  font-size: 1.9rem;
}
.lead {
  color: #475569;
  margin-bottom: 1rem;
}
.diagram {
  margin-top: 1rem;
  .diagram-svg {
    width: 100%;
    max-width: 800px;
    height: auto;
    margin-bottom: 1rem;
    user-select: none;
  }
  .hint {
    color: #6b7280;
  }
}
</style>
