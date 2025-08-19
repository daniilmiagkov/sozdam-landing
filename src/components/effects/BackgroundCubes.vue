<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const wrapper = ref<HTMLElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let controls: OrbitControls | null = null
let rafId = 0

// Коллекции для объектов и ресурсов
const objects: THREE.Object3D[] = []
const geoms: THREE.BufferGeometry[] = []
const mats: THREE.Material[] = []
const texs: THREE.Texture[] = []

// Параметры сцены
const TARGET_COUNT_DESKTOP = 200
const TARGET_COUNT_MOBILE = 50
const SPHERE_SIZE_MIN = 20
const SPHERE_SIZE_MAX = 200
const Z_MIN = -6000
const Z_MAX = 6000
const SPREAD_FACTOR = 3
const MOVEMENT_SPEED = 0.5
const ROTATION_SPEED = 0.0005
const OPACITY = 0.05

// Состояние движения камеры
const cameraState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false,
  rotateLeft: false,
  rotateRight: false,
  rotateUp: false,
  rotateDown: false,
}

function rnd(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// Создание прозрачной сферы без граней
function createSphere(size: number) {
  const segments = Math.max(8, Math.floor(size / 10)) // Адаптивное количество сегментов
  const sphereGeom = new THREE.SphereGeometry(size, segments, segments)
  geoms.push(sphereGeom)

  const material = new THREE.MeshBasicMaterial({
    color: 0xDBEAFE,
    wireframe: true,
    transparent: true,
    opacity: OPACITY,
    depthTest: true,
  })
  mats.push(material)

  const sphere = new THREE.Mesh(sphereGeom, material)
  return sphere
}

// Создание сцены с множеством сфер
function makeSceneObjects() {
  if (!scene)
    return

  const isMobile = window.innerWidth < 720
  const COUNT = isMobile ? TARGET_COUNT_MOBILE : TARGET_COUNT_DESKTOP

  // Размер области размещения объектов
  const spreadX = window.innerWidth * SPREAD_FACTOR
  const spreadY = window.innerHeight * SPREAD_FACTOR

  for (let i = 0; i < COUNT; i++) {
    const size = rnd(SPHERE_SIZE_MIN, SPHERE_SIZE_MAX)
    const sphere = createSphere(size)

    // Позиционируем сферы в пространстве
    const x = rnd(-spreadX, spreadX)
    const y = rnd(-spreadY, spreadY)
    const z = rnd(Z_MIN, Z_MAX)

    sphere.position.set(x, y, z)
    scene.add(sphere)
    objects.push(sphere)

    // Добавляем случайное вращение
    sphere.userData.rotationSpeed = new THREE.Vector3(
      rnd(-ROTATION_SPEED, ROTATION_SPEED),
      rnd(-ROTATION_SPEED, ROTATION_SPEED),
      rnd(-ROTATION_SPEED, ROTATION_SPEED),
    )
  }
}

// Обработчики управления
function handleKeyDown(event: KeyboardEvent) {
  switch (event.key.toLowerCase()) {
    case 'w': cameraState.forward = true; break
    case 's': cameraState.backward = true; break
    case 'a': cameraState.left = true; break
    case 'd': cameraState.right = true; break
    case 'q': cameraState.up = true; break
    case 'e': cameraState.down = true; break
    case 'arrowleft': cameraState.rotateLeft = true; break
    case 'arrowright': cameraState.rotateRight = true; break
    case 'arrowup': cameraState.rotateUp = true; break
    case 'arrowdown': cameraState.rotateDown = true; break
  }
}

function handleKeyUp(event: KeyboardEvent) {
  switch (event.key.toLowerCase()) {
    case 'w': cameraState.forward = false; break
    case 's': cameraState.backward = false; break
    case 'a': cameraState.left = false; break
    case 'd': cameraState.right = false; break
    case 'q': cameraState.up = false; break
    case 'e': cameraState.down = false; break
    case 'arrowleft': cameraState.rotateLeft = false; break
    case 'arrowright': cameraState.rotateRight = false; break
    case 'arrowup': cameraState.rotateUp = false; break
    case 'arrowdown': cameraState.rotateDown = false; break
  }
}

// Анимация и движение
function animate() {
  if (!renderer || !scene || !camera)
    return
  rafId = requestAnimationFrame(animate)

  // Движение камеры
  const direction = new THREE.Vector3()
  camera.getWorldDirection(direction)

  if (cameraState.forward)
    camera.translateZ(-MOVEMENT_SPEED)
  if (cameraState.backward)
    camera.translateZ(MOVEMENT_SPEED)
  if (cameraState.left)
    camera.translateX(-MOVEMENT_SPEED)
  if (cameraState.right)
    camera.translateX(MOVEMENT_SPEED)
  if (cameraState.up)
    camera.translateY(MOVEMENT_SPEED)
  if (cameraState.down)
    camera.translateY(-MOVEMENT_SPEED)

  // Вращение камеры
  if (cameraState.rotateLeft)
    camera.rotation.y += ROTATION_SPEED
  if (cameraState.rotateRight)
    camera.rotation.y -= ROTATION_SPEED
  if (cameraState.rotateUp)
    camera.rotation.x += ROTATION_SPEED
  if (cameraState.rotateDown)
    camera.rotation.x -= ROTATION_SPEED

  // Вращение сфер
  objects.forEach((obj) => {
    if (obj.userData.rotationSpeed) {
      obj.rotation.x += obj.userData.rotationSpeed.x
      obj.rotation.y += obj.userData.rotationSpeed.y
      obj.rotation.z += obj.userData.rotationSpeed.z
    }
  })

  // Обновление элементов управления
  if (controls)
    controls.update()

  renderer.render(scene, camera)
}

function onResize() {
  if (!renderer || !camera)
    return
  const w = window.innerWidth
  const h = window.innerHeight
  renderer.setSize(w, h)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

onMounted(() => {
  if (renderer)
    return

  // Удаляем предыдущий canvas, если есть
  const existing = document.getElementById('bg-shapes-canvas')
  if (existing && existing.parentNode)
    existing.parentNode.removeChild(existing)

  // Создаем рендерер
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)

  const canvas = renderer.domElement
  canvas.id = 'bg-shapes-canvas'
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.zIndex = '0'
  canvas.style.pointerEvents = 'auto' // Разрешаем взаимодействие
  canvas.style.filter = 'brightness(0.78) saturate(0.92)'

  document.body.appendChild(canvas)

  // Настройка сцены
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
  camera.position.set(0, 0, 500)

  // Добавляем элементы управления камерой
  controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.screenSpacePanning = false
  controls.minDistance = 50
  controls.maxDistance = 2000

  // Создаем объекты сцены
  makeSceneObjects()

  // Настройка освещения (необязательно для wireframe, но может понадобиться)
  scene.add(new THREE.AmbientLight(0xFFFFFF, 0.2))

  // Обработчики событий
  window.addEventListener('resize', onResize, { passive: true })
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)

  // Запускаем анимацию
  rafId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)

  // Удаление объектов и ресурсов
  objects.forEach((obj) => {
    try {
      if (obj.parent)
        obj.parent.remove(obj)
    }
    catch (e) {}
  })
  objects.length = 0

  geoms.forEach((geom) => {
    try { geom.dispose() }
    catch (e) {}
  })
  geoms.length = 0

  mats.forEach((mat) => {
    try { mat.dispose() }
    catch (e) {}
  })
  mats.length = 0

  texs.forEach((tex) => {
    try { tex.dispose() }
    catch (e) {}
  })
  texs.length = 0

  // Удаление рендерера
  if (renderer) {
    try { renderer.dispose() }
    catch (e) {}
    const el = document.getElementById('bg-shapes-canvas')
    if (el && el.parentNode)
      el.parentNode.removeChild(el)
    renderer = null
  }

  // Удаление обработчиков событий
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>

<template>
  <div
    ref="wrapper"
    style="position:fixed;inset:0;pointer-events:none;z-index:-1"
  />
</template>

<style scoped>
/* canvas inline-styles берём в JS */
</style>
