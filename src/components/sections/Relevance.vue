<script setup lang="ts">
// пустой setup
</script>

<template>
  <section
    id="relevance"
    data-section="relevance"
    :class="$style.section"
  >
    <h1>Актуальность</h1>

    <section :class="$style.intro">
      <p>
        Современная медицина работает в условиях высокой плотности приёмов и возросших требований к отчётности.
        Средний амбулаторный приём занимает около 12 минут, при этом на оформление документации по разным оценкам
        может уходить до 60–70% этого времени. Врачам остаётся мало времени на тщательный сбор анамнеза, объективный
        осмотр и обсуждение тактики лечения — это повышает риск ошибочных решений, ухудшает коммуникацию с пациентом
        и ведёт к профессиональному выгоранию.
      </p>

      <p>
        Проект «СОЗДАМ» направлен на снижение административной нагрузки: автоматизация распознавания речи,
        привлечение NLP для извлечения клинических сущностей и автоматическое формирование структурированных
        фрагментов медицинской документации позволит вернуть врачу самое ценное — время для пациента и клинического
        мышления.
      </p>
    </section>

    <section :class="$style.impact">
      <h2>Почему это важно</h2>

      <div
        :class="$style.cards"
        role="list"
      >
        <article
          role="listitem"
          :class="$style.card"
        >
          <div :class="$style.cardHeader">
            Улучшение качества приёма
          </div>
          <p :class="$style.desc">
            Врач получает больше времени на сбор анамнеза и обсуждение тактики, что повышает качество клинического решения.
          </p>
        </article>

        <article
          role="listitem"
          :class="$style.card"
        >
          <div :class="$style.cardHeader">
            Снижение ошибок
          </div>
          <p :class="$style.desc">
            Структурированная документация уменьшает риск потери важных данных и ошибок при передаче информации.
          </p>
        </article>

        <article
          role="listitem"
          :class="$style.card"
        >
          <div :class="$style.cardHeader">
            Профилактика выгорания
          </div>
          <p :class="$style.desc">
            Снижение рутинной нагрузки уменьшает стресс и эмоциональное истощение персонала.
          </p>
        </article>

        <article
          role="listitem"
          :class="$style.card"
        >
          <div :class="$style.cardHeader">
            Данные для аналитики
          </div>
          <p :class="$style.desc">
            Анонимизированные записи дают материал для улучшения протоколов, обучения моделей и мониторинга качества.
          </p>
        </article>
      </div>
    </section>
  </section>
</template>

<style module lang="scss">
.section {
  padding: 2rem;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 6px 18px rgba(20, 30, 50, 0.04);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.intro p {
  color: #374151;
  line-height: 1.6;
  font-size: 1.03rem;
  margin: 0;
  text-align: justify;
}

.impact {
  margin-top: 0.6rem;

  h2 {
    margin: 0 0 0.8rem 0;
    color: #0f172a;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .card {
    background: #f8fafc;
    border-radius: 10px;
    padding: 1rem;
    min-height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .cardHeader {
    font-weight: 600;
    color: #0b3b4a;
    margin-bottom: 0.5rem;
    font-size: 1.03rem;
  }
  .desc {
    margin: 0;
    color: #475569;
    line-height: 1.45;
    font-size: 0.98rem;
  }
}

@media (max-width: 720px) {
  .section {
    padding: 1rem;
  }
}
</style>
