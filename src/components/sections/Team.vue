<script setup lang="ts">
interface TeamMember {
  name: string
  role: string
  description: string
  photo: string
}

const team: TeamMember[] = [
  {
    name: 'Лисовский Матвей Андреевич',
    role: 'Лидер команды / Разработчик',
    description: `Студент 5 курса НМИЦ им. В.А. Алмазова и НЯУ МИФИ. 
Лауреат Именной стипендии Правительства. Основатель «СОЗДАМ», организатор работы команды, 
ответственный за взаимодействие с медучреждениями и ВУЗами, подбор информации для обучающих моделей. 
Участник СНО по химии, соавтор научной работы. Разработчик модулей программы, ведущий специалист по подготовке данных. Ведет каналы проекта в Telegram и ВКонтакте.`,
    photo: '/about_lisovskiy.jpg',
  },
  {
    name: 'Мягков Даниил Львович',
    role: 'Руководитель проекта / Фронтенд-разработчик',
    description: `Студент 4 курса СПБГУАП, фронтенд-разработчик в ООО «ХайРус». 
Технический руководитель разработки основной программы: отвечает за архитектуру, 
интеграцию модулей и финальную сборку системы. Также курирует финансовую часть 
проекта и разработку сайта.`,
    photo: '/about_miagkov.jpg',
  },
  {
    name: 'Новосельский Павел Александрович',
    role: 'Разработчик NLP/ASR систем',
    description: `Студент Псковского политехнического колледжа. 
Победитель конкурса «Лучший системный администратор» 2023. 
Ведущий разработчик ключевых модулей системы: создал модуль автоматического распознавания речи (ASR) 
и модуль обучения нейросетей для обработки естественного языка (NLP). Отвечает за подготовку обучающих 
корпусов, архитектуру моделей и их интеграцию в продукт. Также ведет коммуникацию проекта.`,
    photo: '/about_pasha.jpg',
  },
]
</script>

<template>
  <section
    id="team"
    :class="$style.section"
  >
    <h1>Наша команда</h1>

    <div :class="$style.container">
      <div
        v-for="member in team"
        :key="member.name"
        :class="$style.member"
      >
        <img
          :src="member.photo"
          :alt="member.name"
          :class="$style.photo"
        >

        <div :class="$style.info">
          <h2>{{ member.name }}</h2>
          <h3>{{ member.role }}</h3>
          <p>{{ member.description }}</p>
        </div>
      </div>
    </div>

    <!-- <div :class="$style.principles">
      <h2>Наши принципы</h2>
      <div :class="$style.principlesGrid">
        <div :class="$style.principle">
          <h3>Инновационность</h3>
          <p>Использование передовых технологий</p>
        </div>
        <div :class="$style.principle">
          <h3>Качество</h3>
          <p>Тщательное тестирование и валидация</p>
        </div>
        <div :class="$style.principle">
          <h3>Открытость</h3>
          <p>Готовность к сотрудничеству</p>
        </div>
        <div :class="$style.principle">
          <h3>Развитие</h3>
          <p>Постоянное улучшение системы</p>
        </div>
      </div>
    </div> -->
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
    margin-bottom: var(--space-xl);
    text-align: center;
  }

  h2 {
    font-size: var(--font-size-lg);
    color: var(--color-primary);
    margin-bottom: var(--space-sm);
    text-align: center;
  }
}

.container {
  max-width: 1000px;
  margin: var(--space-xl) auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  padding: 0;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    gap: var(--space-xl);
    grid-template-columns: repeat(1, 1fr);
    padding: 0 var(--space-xl);
  }
  @media (max-width: 450px) {
    padding: 0;
  }
}

.member {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.photo {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center 20%;
}

.info {
  padding: var(--space-md);

  h2 {
    font-size: var(--font-size-lg);
    margin: 0 0 var(--space-xs);
    text-align: center;
    color: var(--color-primary);
  }

  h3 {
    font-size: var(--font-size-base);
    color: var(--color-secondary);
    margin-bottom: var(--space-md);
    text-align: center;
  }

  p {
    font-size: var(--font-size-base);
    color: var(--color-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-md);
    text-align: justify;
  }
}

.principles {
  max-width: min(1200px, 95%);
  margin: var(--space-xl) auto 0;
  padding: 0 var(--container-padding);
}

.principlesGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: var(--space-lg);
}

.principle {
  padding: var(--space-lg);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  h3 {
    font-size: var(--font-size-lg);
    color: var(--color-primary);
    margin-bottom: var(--space-sm);
  }

  p {
    font-size: var(--font-size-base);
    color: var(--color-secondary);
    line-height: 1.6;
  }
}
</style>
