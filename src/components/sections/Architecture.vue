<script setup lang="ts">
// Пустой setup - все делаем в шаблоне
</script>

<template>
  <section
    id="architecture"
    :class="$style.section"
  >
    <h1>Архитектура</h1>

    <div :class="$style.grid">
      <article :class="$style.component">
        <h3>Сверточные нейронные сети</h3>
        <ul>
          <li>Анализ визуальных данных</li>
          <li>Выделение ключевых признаков</li>
          <li>Классификация патологий</li>
        </ul>
      </article>

      <article :class="$style.component">
        <h3>Механизмы внимания</h3>
        <ul>
          <li>Фокусировка на важных областях</li>
          <li>Улучшение точности диагностики</li>
          <li>Интерпретируемость результатов</li>
        </ul>
      </article>

      <article :class="$style.component">
        <h3>Распределенные вычисления</h3>
        <ul>
          <li>Обработка больших объемов данных</li>
          <li>Параллельное обучение моделей</li>
          <li>Быстрый отклик системы</li>
        </ul>
      </article>

      <article :class="$style.component">
        <h3>Микросервисная архитектура</h3>
        <ul>
          <li>Масштабируемость системы</li>
          <li>Легкость обновления компонентов</li>
          <li>Отказоустойчивость</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style module lang="scss">
.section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 3rem;
    text-align: center;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.component {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.4rem;
    color: #333;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f0f0;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 1rem;
      color: #666;
      line-height: 1.6;
      margin-bottom: 0.5rem;
      padding-left: 1.2rem;
      position: relative;

      &::before {
        content: '→';
        position: absolute;
        left: 0;
        color: #999;
      }
    }
  }
}
</style>
