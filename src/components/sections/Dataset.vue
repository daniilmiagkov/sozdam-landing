<script setup lang="ts">
import { ref } from 'vue'
import { useAutoStagger } from '../../composables/useAutoStagger'

const root = ref<HTMLElement | null>(null)

useAutoStagger(root, { selector: '.fadeInUp', base: 0.08, step: 0.16, observe: true, startOnView: false })
</script>

<template>
  <section
    id="dataset"
    ref="root"
    data-section="dataset"
    :class="$style.section"
  >
    <h1 class="fadeInUp">
      Датасет
    </h1>

    <p
      :class="$style.lead"
      class="fadeInUp"
    >
      Качество и разнообразие данных напрямую влияют на эффективность модели.
      Мы используем анонимизированные реальные записи, дополняем их синтетически сгенерированными примерами и снабжаем экспертной разметкой, чтобы модель обучалась на максимально полном и разнообразном материале.
    </p>

    <section
      :class="$style.sample"
      class="fadeInUp"
    >
      <h3>Фрагмент записи (JSON)</h3>
      <pre :class="$style.json">
{
  "id": 7,
  "text": "Задача № 7 40-летний больной К обратился с жалобами на кашель с\n мокротой 50—60 мл сут одышка при нагрузке В 16-летнем возрасте диагностирован\n хронический бронхит протекающий с частыми обострениями в виде повышения\n температуры выделения желтозеленоватой мокроты эпизодов кровохарканья Обострения\n купировались антибиотиками За последнее время количество выделяемой мокроты\n увеличилось появилась одышка при незначительной нагрузке Со слов больного его\n сестра умерла в детском возрасте от пневмонии Объективно состояние больного тяжелое\n Отмечается снижение массы тела Температура тела 37 5°С Кожные покровы бледные влажные\n акроцианоз губ Периферические лимфатические узлы не пальпируются Отеков нет\n Концевых фаланг пальцев рук утолщены Грудная клетка бочкообразной формы при\n пальпации безболезненная Голосовое дыхание снижено с обоих сторон Перкуторно\n коробочный звук экскурссия легких снижена Дыхание ослабленное везикулярное\n единичные сухие хрипы в нижних отделах справа влажные мелкопузырчатые хрипы\n ЧДД 23 в мин Тоны сердца приглушены ритмичные ЧСС 92 в мин АД — 100 70 мм рт ст\n Язык чистый влажный Живот мягкий без болезненный при пальпации Печень селезенка\n не увеличены Симптом покалачивания отрицательный с обеих сторон Дизурических\n расстройств нет Стул оформленный регулярный Анализ крови гемоглобин — 110 г л\n эритроциты— 3 9х1012 л лейкоциты 10х109 л э-2 п я-8 с я-68 л-15 м-7 СОЭ — 20 мм час\n Анализ мочи относительная плотность — 1016 белок — 1 6%о лейкоциты — 2-3 В п зр\n эритроциты — 2-3 в п зр цилиндры гиалиновые — 2-4 в п зр Мокрота зеленоватого цвета\n Л — 20-30 в п зр Эр — 4-5 в п зр",
  "cats": [],
  "entities": [
    [55, 61, "B-SYMPTOM"],
    [62, 72, "B-MODIFIER"],
    [73, 81, "I-MODIFIER"],
    [86, 92, "B-SYMPTOM"],
    [93, 105, "I-SYMPTOM"]
  ],
  "Comments": []
}
      </pre>

      <p :class="$style.hint">
        Данные собираются с согласия, проходят анонимизацию и экспертную разметку.
      </p>
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

  h3 {
    font-size: var(--font-size-lg);
    color: var(--color-secondary);
    margin-bottom: var(--space-md);
  }
}

.lead {
  max-width: min(800px, 95%);
  margin: 0 auto var(--space-xl);
  color: var(--color-secondary);
  font-size: var(--font-size-lg);
  line-height: 1.6;
  text-align: center;
}

.sample {
  max-width: min(1000px, 95%);
  margin: 0 auto;

  .json {
    background: #0f172a;
    color: #e6eef8;
    padding: var(--space-lg);
    border-radius: var(--radius-md);
    overflow: auto;
    font-size: var(--font-size-sm);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    line-height: 1.6;
    text-align: left;
    white-space: pre-wrap;
    box-shadow: var(--shadow-md);
    margin: var(--space-md) 0;
  }

  .hint {
    margin-top: var(--space-md);
    color: var(--color-secondary);
    font-size: var(--font-size-sm);
    text-align: center;
    font-style: italic;
  }
}
</style>
