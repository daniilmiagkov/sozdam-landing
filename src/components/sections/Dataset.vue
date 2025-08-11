<script setup lang="ts"></script>

<template>
  <section
    id="dataset"
    data-section="dataset"
    :class="$style.section"
  >
    <h1>Датасет</h1>

    <p :class="$style.lead">
      Качество и разнообразие данных определяют работу модели. Мы комбинируем реальные анонимизированные записи и синтетику,
      а также экспертную разметку.
    </p>

    <section :class="$style.sample">
      <h3>Фрагмент записи (JSON)</h3>
      <pre :class="$style.json">
СЮДА ВСТАВИТЬ КОД ИЗ ДАТАСЕТА (ПРИМЕР)
      </pre>

      <h3>Пример таблицы (выборка)</h3>
      <table :class="$style.table">
        <thead>
          <tr><th>ID</th><th>Transcript</th><th>Entities</th><th>Duration</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>record_000123</td>
            <td>«грудная боль после нагрузки»</td>
            <td>complaint: грудная боль</td>
            <td>35s</td>
          </tr>
          <tr>
            <td>record_000124</td>
            <td>«кашель, мокрота желтоватая»</td>
            <td>complaint: кашель</td>
            <td>22s</td>
          </tr>
        </tbody>
      </table>

      <p :class="$style.hint">
        Данные собираются с согласия, проходят анонимизацию и экспертную разметку.
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

.lead {
  color: #475569;
  margin-bottom: 1rem;
}

.sample {
  .json {
    background: #0f172a;
    color: #e6eef8;
    padding: 1rem;
    border-radius: 8px;
    overflow: auto;
    font-size: 0.92rem;
    text-align: left;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    th,
    td {
      text-align: left;
      padding: 0.6rem 0.8rem;
      border-bottom: 1px solid #eef2f6;
    }
    th {
      font-weight: 600;
      color: #111827;
    }
    td {
      color: #374151;
    }
  }
  .hint {
    margin-top: 0.6rem;
    color: #6b7280;
  }
}
</style>
