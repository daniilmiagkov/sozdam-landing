<script setup lang="ts">
// Пустой setup - все делаем в шаблоне
</script>

<template>
  <section
    id="relevance"
    :class="$style.section"
  >
    <h1>Зачем?</h1>

    <section :class="$style.intro">
      <p>
        Наш проект направлен на решение проблемы автоматизации обработки визуальных данных в медицинской сфере.
      </p>
    </section>

    <section :class="$style.advantages">
      <h2>Основные преимущества:</h2>
      <ul>
        <li>
          <strong>Скорость обработки:</strong>
          мгновенный анализ медицинских изображений
        </li>
        <li>
          <strong>Точность:</strong>
          использование современных алгоритмов машинного обучения
        </li>
        <li>
          <strong>Масштабируемость:</strong>
          возможность обработки больших объемов данных
        </li>
        <li>
          <strong>Поддержка врачей:</strong>
          автоматизация рутинных задач
        </li>
      </ul>
    </section>

    <section :class="$style.conclusion">
      <p>
        Мы разрабатываем систему, которая помогает врачам быстрее и точнее анализировать медицинские изображения,
        что ведет к более эффективной диагностике и лечению пациентов.
      </p>
    </section>
  </section>
</template>

<style module lang="scss">
.section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 0;
  gap: 2rem;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.8rem;
    color: #444;
    margin-bottom: 1rem;
  }

  section {
    margin: 1.5rem 0;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #666;
    max-width: 800px;
  }
}

.intro {
  font-size: 1.2rem;
  margin: 2rem 0;
}

.advantages {
  ul {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    li {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #666;
      padding: 1.5rem;
      background: #f8f8f8;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      strong {
        display: block;
        color: #333;
        margin-bottom: 0.5rem;
      }
    }
  }
}

.conclusion {
  margin-top: 2rem;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;

  p {
    margin: 0;
  }
}
</style>
