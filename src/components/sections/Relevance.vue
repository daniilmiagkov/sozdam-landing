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
  min-height: 100vh;
  padding: var(--section-padding);
  padding-top: calc(var(--header-height) + var(--section-padding));

  h1 {
    font-size: var(--font-size-2xl);
    color: var(--color-primary);
    margin-bottom: var(--space-lg);
    text-align: center;
  }

  h2 {
    font-size: var(--font-size-xl);
    color: var(--color-secondary);
    margin-bottom: var(--space-lg);
    text-align: center;
  }
}

.intro {
  max-width: min(800px, 95%);
  margin: 0 auto var(--space-xl);

  p {
    color: var(--color-secondary);
    line-height: 1.6;
    font-size: var(--font-size-lg);
    margin-bottom: var(--space-md);
    text-align: justify;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.impact {
  max-width: min(1200px, 95%);
  margin: 0 auto;

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: var(--space-md);
    padding: var(--space-sm);
  }

  .card {
    background: var(--color-surface);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    min-height: 180px;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition-normal);
    text-align: center;
  }

  .cardHeader {
    font-size: var(--font-size-lg);
    font-weight: 500;
    color: var(--color-primary);
    margin-bottom: var(--space-sm);
  }

  .desc {
    font-size: var(--font-size-base);
    color: var(--color-secondary);
    line-height: 1.6;
    margin: 0;
  }
}
</style>
