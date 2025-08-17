<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
import { useAutoStagger } from '../../composables/useAutoStagger'

const root = ref<HTMLElement | null>(null)
const canvasRoot = ref<HTMLElement | null>(null)

useAutoStagger(root, { selector: '.fadeInUp', base: 0.08, step: 0.16, observe: true, startOnView: false })

const modules = [
  { title: 'ASR', description: 'Модуль распознавания речи. Обрабатывает аудио в реальном времени.' },
  { title: 'NLP', description: 'Модуль обработки естественного языка. Анализирует текст и выделяет сущности.' },
  { title: 'Структурирование', description: 'Формирует стандартные фрагменты медицинской документации.' },
  { title: 'Форма / Экспорт', description: 'Интерфейс для правок, подтверждения и экспорта в ЭМИС.' },
]

// three state
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let rafId = 0
const meshes: THREE.Mesh[] = []

type AnimState = { progress: number, reached: boolean }
const animStates: AnimState[] = []

const activeIndex = ref<number | null>(null) // для UI: какой шаг сейчас активирован кнопкой

function clamp(v: number, a = 0, b = 1) { return Math.max(a, Math.min(b, v)) }
function easeOutCubic(t: number) { return 1 - (1 - t) ** 3 }

function clearThree() {
  if (rafId) { cancelAnimationFrame(rafId); rafId = 0 }
  meshes.forEach((m) => {
    try {
      if (m.geometry)
        m.geometry.dispose()
      if (Array.isArray(m.material))
        m.material.forEach((mat: any) => mat.dispose())
      else if (m.material)
        (m.material as any).dispose()
      if (scene && m.parent)
        scene.remove(m)
    }
    catch {}
  })
  meshes.length = 0
  animStates.length = 0
  try {
    if (renderer && renderer.domElement && canvasRoot.value instanceof HTMLElement && canvasRoot.value.contains(renderer.domElement)) {
      canvasRoot.value.removeChild(renderer.domElement)
    }
  }
  catch {}
  renderer = null
  scene = null
  camera = null
}

let ro: ResizeObserver | null = null

function initThree() {
  if (!canvasRoot.value) {
    console.error('initThree: canvasRoot is null')
    return
  }
  const container = canvasRoot.value as HTMLElement
  if (!(container instanceof HTMLElement)) {
    console.error('initThree: canvasRoot is not HTMLElement')
    return
  }

  clearThree()

  const rect = container.getBoundingClientRect()
  const cssW = Math.max(120, Math.floor(rect.width || 360))
  const cssH = Math.max(80, Math.floor(rect.height || 240))

  scene = new THREE.Scene()

  // Создаём рендерер и устанавливаем pixelRatio ПЕРЕД setSize
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  const devicePR = window.devicePixelRatio || 1
  // можно лимитировать DPR для perf, но для теста используем фактический DPR:
  renderer.setPixelRatio(devicePR)
  // setSize принимает CSS-пиксели; three умножит на pixelRatio при создании буфера
  renderer.setSize(cssW, cssH, false)
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.position = 'relative'
  renderer.domElement.style.zIndex = '3'

  renderer.domElement.style.border = '1px solid rgba(0,0,0,0.08)'

  container.style.position = container.style.position || 'relative'
  container.appendChild(renderer.domElement)

  // камера и свет как раньше
  camera = new THREE.PerspectiveCamera(89, 100, 0.1, 100)
  camera.position.set(0, 0, 5)
  camera.lookAt(0, 0, 4)

  const hemi = new THREE.HemisphereLight(0xFFFFFF, 0x444444, 0.95)
  const dir = new THREE.DirectionalLight(0xFFFFFF, 0.9)
  dir.position.set(5, 10, 7)
  scene.add(hemi, dir)

  const boxGeo = new THREE.BoxGeometry(1, 1, 1)
  for (let i = 0; i < modules.length; i++) {
    const h = 0.9 - i * 0.06
    const color = new THREE.Color().setHSL(h, 0.6, 0.6)
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.05 })
    const mesh = new THREE.Mesh(boxGeo, mat)
    mesh.position.set(-10, 1.6 - i * 1.4, 0)
    mesh.rotation.set(0, 0, 0)
    console.log(mesh)
    scene.add(mesh)
    meshes.push(mesh)
    animStates.push({ progress: 0, reached: false })
  }

  if (ro) { ro.disconnect(); ro = null }
  ro = new ResizeObserver(() => {
    resizeRendererToContainer()
  })
  ro.observe(container)
  window.addEventListener('resize', resizeRendererToContainer, { passive: true })

  animate()
}

function resizeRendererToContainer() {
  if (!canvasRoot.value || !renderer || !camera)
    return
  const rect = (canvasRoot.value as HTMLElement).getBoundingClientRect()
  const cssW = Math.max(1, Math.floor(rect.width))
  const cssH = Math.max(1, Math.floor(rect.height))
  const dpr = window.devicePixelRatio || 1
  renderer.setPixelRatio(dpr) 
  renderer.setSize(cssW, cssH, false)
  camera.aspect = cssW / cssH
  camera.updateProjectionMatrix()

}

onMounted(async () => {
  await nextTick()
  initThree()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeRendererToContainer)
  if (ro) { ro.disconnect(); ro = null }
  if (rafId)
    cancelAnimationFrame(rafId)
  clearThree()
})

let isAnimating = false

function animate() {
  let stillAnimating = false

  for (let i = 0; i < meshes.length; i++) {
    const mesh = meshes[i]
    const st = animStates[i]

    // плавное наращивание прогресса
    if (st.progress < 1 && activeIndex.value === i) {
      st.progress += 0.03
      if (st.progress > 1)
        st.progress = 1
    }

    const p = clamp(st.progress, 0, 1)
    const eased = easeOutCubic(p)

    const startX = -10
    const endX = 0
    mesh.position.x = startX + (endX - startX) * eased

    if (Math.abs(mesh.position.x - endX) > 0.001 || st.progress < 1) {
      stillAnimating = true
    }
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }

  if (stillAnimating) {
    isAnimating = true
    rafId = requestAnimationFrame(animate)
  }
  else {
    isAnimating = false
    rafId = 0
  }
}

function triggerAnimation() {
  if (!isAnimating) {
    animate()
  }
}

function goToStep(idx: number) {
  // сбрасываем прогресс выбранного блока
  for (let i = 0; i < animStates.length; i++) {
    if (i === idx) {
      animStates[i].progress = 0 // начинаем анимацию заново
      animStates[i].reached = false
    }
    else {
      animStates[i].progress = 1 // остальные сразу в конечное состояние
      animStates[i].reached = true
    }
  }

  activeIndex.value = idx

  // запускаем анимацию, если она не запущена
  triggerAnimation()
}

function nextStep() {
  for (let i = 0; i < meshes.length; i++) {
    animStates[i].progress = 1
  }
  // triggerAnimation()
}

function prevStep() {
  for (let i = 0; i < meshes.length; i++) {
    animStates[i].progress = 0
  }
}

function resetAll() {
  animStates.forEach((s) => { s.progress = 0; s.reached = false })
  activeIndex.value = null
}
</script>

<template>
  <section
    ref="root"
    :class="$style.section"
  >
    <h1
      class="fadeInUp"
      :class="$style.title"
    >
      Архитектура
    </h1>
    <p
      class="fadeInUp"
      :class="$style.lead"
    >
      Тест управления анимацией через кнопки + улучшенное качество canvas.
    </p>

    <div
      ref="canvasRoot"
      :class="$style.canvasRoot"
      aria-hidden="true"
    >
      <div :class="$style.canvasFallback">
        3D canvas (debug)
      </div>
    </div>

    <div :class="$style.controls">
      <button @click="prevStep">
        Prev
      </button>
      <button @click="nextStep">
        Next
      </button>
      <button @click="resetAll">
        Reset
      </button>
      <span class="spacer" />
      <template
        v-for="(m, i) in modules"
        :key="m.title"
      >
        <button
          :class="{ active: activeIndex === i }"
          @click="() => goToStep(i)"
        >
          {{ i + 1 }}
        </button>
      </template>
    </div>

    <div :class="$style.flow">
      <div
        v-for="(m, i) in modules"
        :key="m.title"
        class="fadeInUp"
        :class="[$style.step]"
        data-step="true"
        :data-index="i"
      >
        <div :class="$style.left">
          <div :class="$style.block">
            <div :class="$style.blockInner">
              <span>{{ m.title }}</span>
            </div>
          </div>
          <div
            :class="$style.arrow"
            aria-hidden="true"
          >
            <div :class="$style.arrowLine" />
            <div :class="$style.arrowHead" />
          </div>
        </div>
        <div :class="$style.right">
          {{ m.description }}
        </div>
      </div>
    </div>
  </section>
</template>

<style module lang="scss">
.section {
  min-height: 100vh;
  padding: var(--section-padding);
  padding-top: calc(var(--header-height) + var(--section-padding));
  position: relative;
  overflow: visible;
}
.canvasRoot {
  /* сделаем canvas немного больше, можно настроить */

  position: absolute;
  left: 12px;
  top: calc(var(--header-height) + var(--space-sm));
  pointer-events: none;
  z-index: 3;
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
}
.canvasFallback {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.35);
  background: rgba(255, 255, 255, 0.4);
  padding: 4px 8px;
  border-radius: 6px;
  position: absolute;
  bottom: 6px;
  left: 6px;
  pointer-events: none;
}

.controls {
  position: relative;
  margin: calc(var(--space-sm) * 2) 0;
  display: flex;
  gap: 8px;
  align-items: center;
  z-index: 5;
}
.controls button {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: white;
  cursor: pointer;
}
.controls button.active {
  background: #2563eb;
  color: white;
  border-color: #1e40af;
}
.controls .spacer {
  width: 8px;
}

.flow {
  max-width: min(1000px, 95%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  position: relative;
  z-index: 2;
}

/* оставил остальные стили без изменений — просто минимально адаптировал */
.step {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-areas: 'left right';
  gap: var(--space-lg);
  padding: calc(var(--space-sm) * 0.4) 0;
  position: relative;
}
.left {
  grid-area: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}
.block {
  width: 180px;
  height: 60px;
  position: relative;
  perspective: 1000px;
}
.blockInner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #fff, #f0f9ff);
  border-radius: 10px;
  font-weight: 600;
}
.arrow {
  height: 100px;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.45s;
}
.right {
  grid-area: right;
  background: rgba(255, 255, 255, 0.7);
  padding: var(--space-md);
  border-radius: 12px;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.45s;
}
.step.three-revealed .arrow {
  opacity: 1;
  transform: translateY(0);
}
.step.three-revealed .right {
  opacity: 1;
  transform: translateX(0);
}
</style>
