<script setup lang="ts"></script>

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

    <section :class="$style.gridCards">
      <article :class="$style.card">
        <h3>1. ASR — распознавание речи</h3>
        <p>Шумоподавление, буферизация, потоковое распознавание и промежуточные варианты транскрипта.</p>
      </article>

      <article :class="$style.card">
        <h3>2. NLP — извлечение сущностей</h3>
        <p>Медицинские сущности, нормализация терминов, сопоставление с клиническими справочниками.</p>
      </article>

      <article :class="$style.card">
        <h3>3. Структурирование</h3>
        <p>Сборка шаблонов документации, сопоставление полей, автозаполнение.</p>
      </article>

      <article :class="$style.card">
        <h3>4. UI / Подтверждение</h3>
        <p>Интерфейс для врача: правки, утверждение, экспорт в ЭМИС.</p>
      </article>

      <article :class="$style.card">
        <h3>5. Хранение и аналитика</h3>
        <p>Анонимное хранение, метрики качества и обучение моделей.</p>
      </article>
    </section>

    <section :class="$style.diagram">
      <h3>Процесс данных (упрощённо)</h3>
      <ol>
        <li>Аудио → ASR → текст</li>
        <li>Текст → NLP → сущности</li>
        <li>Сущности → Формирование записи → UI</li>
        <li>Подтверждённый документ → Экспорт/БД</li>
      </ol>
      <p :class="$style.hint">
        В будущем можно заменить на SVG-диаграмму с интерактивом.
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

.gridCards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.card {
  padding: 1rem;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #eef2f6;
  h3 {
    margin: 0 0 0.4rem 0;
    font-size: 1.02rem;
  }
  p {
    margin: 0;
    color: #4b5563;
  }
}

.diagram {
  margin-top: 1rem;
  h3 {
    margin-bottom: 0.6rem;
  }
  ol {
    padding-left: 1.2rem;
    color: #374151;
  }
  .hint {
    color: #6b7280;
    margin-top: 0.6rem;
  }
}
</style>
