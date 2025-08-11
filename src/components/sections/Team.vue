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
    role: 'Руководитель разработки / Фронтенд-разработчик',
    description: `Бакалавр информационных систем и технологий, фронтенд-разработчик в ООО «ХайРус». 
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
  padding: 2rem 0;

  h2 {
    font-size: 1.8rem;
    color: #444;
    margin-bottom: 2rem;
    text-align: center;
  }
}

.container {
  max-width: 900px;
  margin: 40px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  padding: 0 1rem;
}

.member {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
}

.photo {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center 20%;
}

.info {
  padding: 1.5rem;

  h2 {
    font-size: 1.4rem;
    margin: 0 0 0.5rem;
    text-align: center;
  }

  h3 {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    text-align: justify;
  }
}

.principles {
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 1rem;
}

.principlesGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.principle {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;

  h3 {
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
