<script setup lang="ts">
interface TeamMember {
  name: string
  role: string
  description: string
  photo: string
  links: {
    github: string
    telegram: string
  }
}

const team: TeamMember[] = [
  {
    name: 'Даниил Мягков',
    role: 'Руководитель проекта',
    description: 'Специалист в области машинного обучения и компьютерного зрения',
    photo: '/about_miagkov.jpg',
    links: {
      github: 'https://github.com/daniilmiagkov',
      telegram: 'https://t.me/daniilmiagkov',
    },
  },
  {
    name: 'Павел Чуйкин',
    role: 'Разработчик',
    description: 'Эксперт в области глубокого обучения и нейронных сетей',
    photo: '/about_pasha.jpg',
    links: {
      github: 'https://github.com/pasha',
      telegram: 'https://t.me/pasha',
    },
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

          <div :class="$style.links">
            <a
              :href="member.links.github"
              target="_blank"
              rel="noopener"
              :class="$style.link"
            >
              GitHub
            </a>
            <a
              :href="member.links.telegram"
              target="_blank"
              rel="noopener"
              :class="$style.link"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>

    <div :class="$style.principles">
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
}

.info {
  padding: 1.5rem;
  text-align: center;

  h2 {
    font-size: 1.4rem;
    margin: 0 0 0.5rem;
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
  }
}

.links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.link {
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #333;
    color: #fff;
    border-color: #333;
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
