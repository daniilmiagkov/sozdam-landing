<script setup lang="ts">
// Пустой setup - все делаем в шаблоне
</script>

<template>
  <section
    id="demo"
    :class="$style.section"
  >
    <h1>Демо</h1>

    <section :class="$style.mainDemo">
      <h2>Посмотрите как работает наша система</h2>

      <!-- <video
        src="/demo.mp4"
        controls
        :class="$style.demoVideo"
      >
        Ваш браузер не поддерживает видео HTML5.
      </video> -->
    </section>

    <section :class="$style.features">
      <h2>Основные возможности демо:</h2>

      <ul>
        <li>Загрузка медицинских изображений</li>
        <li>Автоматический анализ и выделение патологий</li>
        <li>Генерация подробного отчета</li>
        <li>Возможность корректировки результатов</li>
      </ul>
    </section>

    <section :class="$style.howTo">
      <h3>Как начать использовать:</h3>

      <ol>
        <li>Загрузите изображение через интерфейс</li>
        <li>Дождитесь автоматического анализа</li>
        <li>Просмотрите результаты</li>
        <li>При необходимости внесите корректировки</li>
        <li>Сгенерируйте и скачайте отчет</li>
      </ol>
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

  h3 {
    font-size: 1.4rem;
    color: #555;
    margin-bottom: 1rem;
  }

  section {
    margin: 2rem 0;
  }
}

.mainDemo {
  text-align: center;
}

.demoVideo {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  display: block;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.features {
  ul {
    list-style-type: disc;
    padding-left: 1.5rem;

    li {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 0.5rem;
      color: #666;
    }
  }
}

.howTo {
  ol {
    list-style-type: decimal;
    padding-left: 1.5rem;

    li {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 0.5rem;
      color: #666;
    }
  }
}
</style>
