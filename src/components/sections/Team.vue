<script setup lang="ts">
import { ref } from 'vue'
import { useAutoStagger } from '../../composables/useAutoStagger'

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
    description: `Студент 5 курса НМИЦ им. В.А. Алмазова и НЯУ МИФИ. Лауреат Именной стипендии Правительства. 
    Основатель «СОЗДАМ», организатор работы команды, ответственный за взаимодействие с медучреждениями и ВУЗами, 
    подбор информации для обучающих моделей. Участник СНО по химии, соавтор научной работы. Разработчик модулей программы, 
    ведущий специалист по подготовке данных. Ведет каналы проекта в Telegram и ВКонтакте.`,
    photo: '/about_lisovskiy.jpg',
  },
  {
    name: 'Мягков Даниил Львович',
    role: 'Руководитель разработки / Фронтенд-разработчик',
    description: `Бакалавр информационных систем и технологий СПБГУАП, фронтенд-разработчик в ООО «ХайРус». 
    Технический руководитель разработки основной программы: отвечает за архитектуру, интеграцию модулей и финальную сборку системы. 
    Также курирует финансовую часть проекта и разработку сайта.`,
    photo: '/about_miagkov.jpg',
  },
  {
    name: 'Новосельский Павел Александрович',
    role: 'Разработчик NLP/ASR систем',
    description: `Студент ПСКОВГУ. Ведущий разработчик ключевых модулей системы: занимается разработкой модуля автоматического распознавания речи (ASR) 
    и модуля обучения нейросетей для обработки естественного языка (NLP). Отвечает за подготовку обучающих корпусов, архитектуру моделей и их интеграцию в продукт. 
    Также ведет коммуникацию проекта.`,
    photo: '/about_pasha.jpg',
  },
]

const projectQR = [
  { name: 't.me/sozzdam', img: '/qr/Телеграмм_qr.png', link: 'https://t.me/sozzdam' },
  { name: 'vk.com/sozzdam', img: '/qr/ВК_qr.png', link: 'https://vk.com/sozzdam' },
]

const root = ref<HTMLElement | null>(null)

useAutoStagger(root, { selector: '.fadeInUp', base: 0.08, step: 0.16, observe: true, startOnView: false })
</script>

<template>
  <section
    id="team"
    ref="root"
    :class="$style.section"
  >
    <h1 class="fadeInUp">
      Наша команда
    </h1>

    <div :class="$style.container">
      <div
        v-for="member in team"
        :key="member.name"
        :class="$style.member"
        class="fadeInUp"
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

    <div
      :class="$style.qrSection"
      class="fadeInUp"
    >
      <h1>Мы в соцсетях</h1>
      <div :class="$style.qrLinks">
        <a
          v-for="qr in projectQR"
          :key="qr.name"
          :href="qr.link"
          target="_blank"
          :class="$style.qrItem"
          class="fadeInUp"
        >
          <img
            :src="qr.img"
            :alt="`QR ${qr.name}`"
            :class="$style.qr"
          >
          <span>{{ qr.name }}</span>
        </a>
      </div>
    </div>
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

  @media (max-width: 455px) {
    h1 {
      margin: var(--space-xs);
    }
  }

  h2 {
    font-size: var(--font-size-lg);
    color: var(--color-primary);
    margin-bottom: var(--space-sm);
    text-align: center;
  }
}

.container {
  max-width: 1200px;
  margin: var(--space-xl) auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 var(--space-md);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
    margin: var(--space-md) auto;
  }
  @media (max-width: 400px) {
    padding: 0 var(--space-xs);
  }
}

.member {
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
    text-align: justify;
  }
}

/* QR-коды */
.qrSection {
  text-align: center;
}

.qrLinks {
  display: flex;
  justify-content: center;
  gap: var(--space-2xl);
  flex-wrap: wrap;
  margin: var(--space-xl);
}

.qrItem {
  text-align: center;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);

  &:hover img {
    transform: scale(1.05);
    box-shadow: var(--shadow-md);
  }
}

.qr {
  width: 200px;
  height: 200px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-xs);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
</style>
