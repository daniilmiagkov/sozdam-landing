<script setup lang="ts">
// пустой setup — логика в HomeSections (если понадобится)
</script>

<template>
  <section
    id="relevance"
    data-section="relevance"
    :class="$style.section"
  >
    <h1>Зачем? (Актуальность)</h1>

    <section :class="$style.intro">
      <p>
        В современном здравоохранении значительная часть времени уходит на документацию.
        Средний приём занимает около 12 минут, и до 70% этого времени может уходить на оформление записей.
        Наша цель — вернуть это время врачу и пациенту.
      </p>
    </section>

    <section :class="$style.advantages">
      <h2>Проблемы, которые решаем</h2>
      <ul>
        <li>
          <strong>Меньше рутины:</strong>
          снижение времени на оформление приёма.
        </li>
        <li>
          <strong>Меньше ошибок:</strong>
          структурированная запись уменьшает риск потерь и опечаток.
        </li>
        <li>
          <strong>Больше внимания пациенту:</strong>
          врач больше времени тратит на диагностику и общение.
        </li>
        <li>
          <strong>Аналитика:</strong>
          накопление анонимных данных для улучшения качества.
        </li>
      </ul>
    </section>

    <section :class="$style.poll">
      <h3>Опрос</h3>
      <p>Актуальна ли для вас проблема объёма документации на приёме?</p>
      <div
        :class="$style.pollBtns"
        role="group"
        aria-label="Опрос"
      >
        <button type="button">
          Да
        </button>
        <button type="button">
          Нет
        </button>
      </div>
      <p :class="$style.hint">
        (Кнопки статичные — можно подключить API по желанию)
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
  margin-bottom: 0.6rem;
  color: #111827;
}
.intro p {
  color: #374151;
  line-height: 1.6;
  font-size: 1.03rem;
}

.advantages {
  margin-top: 1rem;
  h2 {
    font-size: 1.2rem;
    color: #0f172a;
    margin-bottom: 0.6rem;
  }
  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.8rem;
    li {
      padding: 0.9rem;
      background: #f8fafc;
      border-radius: 8px;
      strong {
        display: block;
        margin-bottom: 0.4rem;
        color: #0f172a;
      }
      color: #4b5563;
    }
  }
}

.poll {
  margin-top: 1.2rem;
  .pollBtns {
    display: flex;
    gap: 0.6rem;
    button {
      padding: 0.55rem 0.9rem;
      border-radius: 8px;
      border: 1px solid #e6eef8;
      background: white;
      cursor: pointer;
      transition: transform 0.12s ease;
      &:hover {
        transform: translateY(-2px);
      }
    }
  }
  .hint {
    color: #6b7280;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
}
</style>
