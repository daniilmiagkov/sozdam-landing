<script setup lang="ts">
// Типы данных для примера JSON
interface Annotation {
  location: [number, number, number, number]
  size: string
  type: string
}

interface ImageData {
  id: string
  type: string
  region: string
  pathology: string
  confidence: number
  annotations: Annotation
}

const exampleData: ImageData = {
  id: 'IMG_001',
  type: 'MRI',
  region: 'Brain',
  pathology: 'Tumor',
  confidence: 0.98,
  annotations: {
    location: [120, 150, 180, 210],
    size: '25mm',
    type: 'malignant',
  },
}
</script>

<template>
  <section
    id="dataset"
    :class="$style.section"
  >
    <h1>Датасет</h1>

    <div :class="$style.content">
      <section :class="$style.info">
        <h2>Состав датасета</h2>

        <div :class="$style.stats">
          <div :class="$style.stat">
            <h3>10,000+</h3>
            <p>Размеченных изображений</p>
          </div>
          <div :class="$style.stat">
            <h3>100%</h3>
            <p>Экспертная разметка</p>
          </div>
          <div :class="$style.stat">
            <h3>15+</h3>
            <p>Типов патологий</p>
          </div>
        </div>
      </section>

      <section :class="$style.example">
        <h2>Пример данных</h2>
        <pre :class="$style.code">{{ JSON.stringify(exampleData, null, 2) }}</pre>
      </section>

      <section :class="$style.features">
        <h2>Особенности</h2>
        <div :class="$style.featureGrid">
          <div :class="$style.feature">
            <h4>Качество разметки</h4>
            <p>Многоуровневая проверка и валидация экспертами</p>
          </div>
          <div :class="$style.feature">
            <h4>Сбалансированность</h4>
            <p>Равномерное распределение классов</p>
          </div>
          <div :class="$style.feature">
            <h4>Разнообразие</h4>
            <p>Различные типы исследований и патологий</p>
          </div>
          <div :class="$style.feature">
            <h4>Актуальность</h4>
            <p>Регулярное обновление и дополнение</p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style module lang="scss">
.section {
  min-height: 100vh;
  padding: 2rem 0;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 3rem;
    text-align: center;
  }

  h2 {
    font-size: 1.8rem;
    color: #444;
    margin-bottom: 2rem;
    text-align: center;
  }
}

.content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.stat {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;

  h3 {
    font-size: 2.5rem;
    color: #007bff;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }
}

.example {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;

  .code {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    font-family: monospace;
    font-size: 0.9rem;
    line-height: 1.4;
    overflow-x: auto;
  }
}

.featureGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.feature {
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h4 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    line-height: 1.5;
  }
}
</style>
