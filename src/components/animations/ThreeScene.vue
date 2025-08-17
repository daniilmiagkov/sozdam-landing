<script setup lang="ts">
/*
  ArchTrois.vue
  - Trois (declarative three.js for Vue)
  - GSAP + ScrollTrigger drives animations by mutating reactive state
*/

import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// Trois imports
// Если сборка ругается — попробуй `import * as Trois from 'trois'`
// и использовать Trois.Canvas / Trois.PerspectiveCamera и т.д.
import { Canvas, PerspectiveCamera } from 'trois' // компоненты используем в шаблоне

gsap.registerPlugin(ScrollTrigger)

// Модули — можешь передавать через props, пока локально
const modules = [
  {
    id: 'asr',
    title: 'ASR',
    description:
      'Распознавание речи, шумоподавление, потоковое преобразование аудио в текст.',
  },
  {
    id: 'nlp',
    title: 'NLP',
    description: 'Анализ текста, выделение медицинских сущностей.',
  },
  {
    id: 'struct',
    title: 'Структурирование',
    description: 'Формирование фрагментов меддокументации.',
  },
  {
    id: 'form',
    title: 'Форма / Экспорт',
    description: 'Правка, подтверждение, экспорт в ЭМИС.',
  },
]

// реактивное состояние для каждого 3D-блока
const states = reactive(
  modules.map((_, i) => ({
    // начальная позиция — слева (offscreen)
    x: -6 - i * 0.3,
    y: 0,
    z: -i * 0.6,
    // масштаб (sx, sy, sz)
    sx: 0.6,
    sy: 0.6,
    sz: 0.6,
    // rotation around Y
    ry: 0,
    // arrow visibility/position
    arrowVisible: false,
    arrowX: 0,
    arrowY: 0,
    arrowZ: 0,
    arrowDirX: 0,
    arrowDirY: -1,
    arrowDirZ: 0,
    arrowLen: 0.5,
  })),
)

const wrapper = ref<HTMLElement | null>(null)
const canvasRoot = ref<HTMLElement | null>(null)

let stInstances: gsap.core.Timeline[] = []

/* ---------- bind GSAP ScrollTriggers ---------- */
async function bindScrollTriggers() {
  await nextTick()

  // ждём появления карточек (если рендерятся лениво)
  let attempts = 0
  let cards = Array.from(document.querySelectorAll('.module-card')) as HTMLElement[]
  while (!cards.length && attempts < 12) {
    await new Promise(r => setTimeout(r, 100))
    cards = Array.from(document.querySelectorAll('.module-card')) as HTMLElement[]
    attempts++
  }
  console.log('[ArchTrois] module-cards found:', cards.length, 'attempts', attempts)
  if (!cards.length)
    return

  // убиваем старые
  ScrollTrigger.getAll().forEach(s => s.kill())
  stInstances.forEach(t => t.kill())
  stInstances = []

  cards.forEach((card, i) => {
    const s = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top center',
        end: 'bottom center',
        // scrub: true, // опция: если хочешь "scrub"-синхронизацию с прокруткой
        toggleActions: 'play reverse play reverse',
        // markers: true, // включи для отладки
      },
    })

    // анимируем реактивные поля states[i]
    s.to(states[i], { x: 0, duration: 0.9, ease: 'power2.out' }, 0) // подъезд к центру
    s.to(states[i], { sx: 1, sy: 1, sz: 1, duration: 0.6, ease: 'back.out(1.1)' }, 0.2)
    s.to(states[i], { ry: Math.PI * 1.5, duration: 1.0, ease: 'power3.out' }, 0.1)

    // показываем стрелку к следующему блоку (если есть)
    if (i < modules.length - 1) {
      s.call(() => {
        const a = states[i]
        const cur = { x: a.x, y: a.y, z: a.z } // после анимации x будет 0
        // вычислим положение следующего блока (те же формулы, т.к. states содержит target)
        const next = { x: states[i + 1].x, y: states[i + 1].y, z: states[i + 1].z }
        // mid point
        const mx = (cur.x + next.x) / 2
        const my = (cur.y + next.y) / 2 - 0.05
        const mz = (cur.z + next.z) / 2

        a.arrowX = mx
        a.arrowY = my
        a.arrowZ = mz
        // direction vector (normalized)
        const dx = next.x - cur.x
        const dy = next.y - cur.y
        const dz = next.z - cur.z
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1
        a.arrowDirX = dx / len
        a.arrowDirY = dy / len
        a.arrowDirZ = dz / len
        a.arrowLen = Math.max(0.25, len * 0.9)
        a.arrowVisible = true
      }, undefined, '>-0.1')

      s.fromTo(
        states[i],
        { /* dummy start */ },
        {
          duration: 0.45,
          onStart: () => {
            // we could pulse the arrow scale (handled in template via :scale)
            /* noop */
          },
        },
        '<',
      )
    }

    stInstances.push(s)
  })
}

/* ---------- lifecycle ---------- */
onMounted(async () => {
  // ждём что DOM уже отрисовался
  await nextTick()
  bindScrollTriggers()
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(s => s.kill())
  stInstances.forEach(t => t.kill())
  stInstances = []
})
</script>

<template>
  <section
    ref="wrapper"
    class="arch-root"
  >
    <h1 class="title">
      Архитектура
    </h1>
    <p class="lead">
      Система разделена на независимые модули... (пример)
    </p>

    <div class="layout">
      <!-- ЛЕВАЯ КОЛОНКА: Canvas -->
      <div
        ref="canvasRoot"
        class="left"
      >
        <Canvas style="width:100%; height:100%; min-height:420px;">
          <PerspectiveCamera :position="[0, 1.2, 4]" />
          <ambient-light :intensity="0.35" />
          <directional-light
            :position="[5, 10, 7]"
            :intensity="0.9"
          />

          <!-- Меши: позиция/scale/rotation привязаны к reactive states -->
          <template
            v-for="(m, i) in modules"
            :key="m.id"
          >
            <mesh
              :position="[states[i].x, states[i].y, states[i].z]"
              :rotation="[0, states[i].ry, 0]"
              :scale="[states[i].sx, states[i].sy, states[i].sz]"
            >
              <boxGeometry :args="[1, 0.7, 0.5]" />
              <meshStandardMaterial :color="0x60A5FA" />
            </mesh>

            <!-- простая стрелка: конус + стержень (делаем как group) -->
            <group
              v-if="states[i].arrowVisible"
              :position="[states[i].arrowX, states[i].arrowY, states[i].arrowZ]"
            >
              <!-- палка -->
              <mesh
                :scale="[1, states[i].arrowLen, 1]"
                :rotation="[Math.PI / 2, 0, 0]"
              >
                <cylinderGeometry :args="[0.04, 0.04, 1, 8]" />
                <meshStandardMaterial color="#60a5fa" />
              </mesh>
              <!-- головка стрелки: конус, ставим в конце стержня -->
              <mesh
                :position="[0, states[i].arrowLen / 2 + 0.06, 0]"
                :rotation="[Math.PI / 2, 0, 0]"
              >
                <coneGeometry :args="[0.09, 0.18, 12]" />
                <meshStandardMaterial color="#1e40af" />
              </mesh>
            </group>
          </template>
        </Canvas>
      </div>

      <!-- ПРАВАЯ КОЛОНКА: карточки, по которым скроллим -->
      <div class="right">
        <section
          v-for="(m, i) in modules"
          :key="m.id"
          class="module-card"
          style="margin-bottom:48px; padding:20px; border-radius:12px; background:#fff; box-shadow:var(--shadow-md)"
        >
          <h3>{{ m.title }}</h3>
          <p>{{ m.description }}</p>
          <p style="font-size:13px; color: #64748b">
            <em>Прокрути, чтобы увидеть анимацию 3D-блока</em>
          </p>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.arch-root {
  padding: 28px;
  background: linear-gradient(180deg, #fbfdff, #f3f9ff);
}
.title {
  text-align: center;
  font-size: 28px;
  color: #1e40af;
  margin-bottom: 16px;
}
.lead {
  text-align: center;
  color: #475569;
  margin-bottom: 24px;
  max-width: 880px;
  margin-left: auto;
  margin-right: auto;
}

.layout {
  display: grid;
  grid-template-columns: 520px 1fr;
  gap: 28px;
  align-items: start;
}

/* ЛЕВАЯ панель — sticky canvas (трим) */
.left {
  position: sticky;
  top: 96px;
  height: 520px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(180deg, #f8fbff, #eef7ff);
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.06);
  padding: 12px;
}

/* ПРАВАЯ: карточки */
.right {
  padding-top: 6px;
}
.module-card {
  background: white;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
}
</style>
