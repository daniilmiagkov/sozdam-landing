<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const wrapper = ref<HTMLElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let rafId = 0

// теперь объекты могут быть группами/спрайтами
const objects: THREE.Object3D[] = []

// коллекции для корректного освобождения ресурсов
const geoms: THREE.BufferGeometry[] = []
const mats: THREE.Material[] = []
const texs: THREE.Texture[] = []

// Параметры
const TARGET_COUNT_DESKTOP = 100
const TARGET_COUNT_MOBILE = 6
const MOLECULE_SIZE_MIN = 10
const MOLECULE_SIZE_MAX = 1000
const WORD_SIZE_MIN = 0
const WORD_SIZE_MAX = 0
const Z_MIN = 50
const Z_MAX = -500
const SPEED_BASE = 0.0001

function rnd(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function createMolecule(size: number) {
  const group = new THREE.Group()

  const atomCount = Math.floor(rnd(3, 10))
  const atomRadius = Math.max(1.6, size * 0.06)
  const span = Math.max(20, size * 0.9)

  const sphereGeom = new THREE.SphereGeometry(atomRadius, 10, 8)
  geoms.push(sphereGeom)

  // Материал для атомов - только каркас
  const matAtom = new THREE.MeshBasicMaterial({
    color: 0xDBEAFE,
    wireframe: true,
    transparent: true,
    opacity: 0.05,
  })
  mats.push(matAtom)

  const atomPositions: THREE.Vector3[] = []

  for (let i = 0; i < atomCount; i++) {
    const x = rnd(-span, span)
    const y = rnd(-span * 0.6, span * 0.6)
    const z = rnd(-span * 0.3, span * 0.3)
    atomPositions.push(new THREE.Vector3(x, y, z))

    const mesh = new THREE.Mesh(sphereGeom, matAtom)
    mesh.position.set(x, y, z)
    mesh.castShadow = false
    mesh.receiveShadow = false
    group.add(mesh)
  }

  // Код для создания связей между атомами (оставляем без изменений)
  const segments: number[] = []
  for (let i = 0; i < atomPositions.length; i++) {
    for (let j = i + 1; j < atomPositions.length; j++) {
      const d = atomPositions[i].distanceTo(atomPositions[j])
      if (d < span * 0.9) {
        segments.push(atomPositions[i].x, atomPositions[i].y, atomPositions[i].z)
        segments.push(atomPositions[j].x, atomPositions[j].y, atomPositions[j].z)
      }
    }
  }

  if (segments.length > 0) {
    const bondGeom = new THREE.BufferGeometry()
    bondGeom.setAttribute('position', new THREE.Float32BufferAttribute(segments, 3))
    geoms.push(bondGeom)
    const bondMat = new THREE.LineBasicMaterial({
      color: 0xDBEAFE,
      transparent: true,
      opacity: 0.05,
      toneMapped: false,
    })
    mats.push(bondMat)
    const lines = new THREE.LineSegments(bondGeom, bondMat)
    group.add(lines)
  }

  group.rotation.set(rnd(0, Math.PI), rnd(0, Math.PI), rnd(0, Math.PI))
  const depthFactor = THREE.MathUtils.clamp(1 - size / 180, 0.5, 1)
  group.scale.setScalar(depthFactor * (0.7 + Math.random() * 0.6))

  ;(group.userData as any).rotSpeed = {
    x: rnd(-1, 1) * SPEED_BASE * (0.6 + Math.random() * 0.9),
    y: rnd(-1, 1) * SPEED_BASE * (0.6 + Math.random() * 0.9),
    z: rnd(-0.6, 0.6) * SPEED_BASE * (0.3 + Math.random() * 0.6),
  }

  return group
}

function makeSceneObjects() {
  if (!scene)
    return

  const isMobile = window.innerWidth < 720
  const COUNT = isMobile ? TARGET_COUNT_MOBILE : TARGET_COUNT_DESKTOP

  const spreadX = window.innerWidth / 10
  const spreadY = window.innerHeight / 10

  for (let i = 0; i < COUNT; i++) {
    if (Math.random() < 0.64) {
      const size = rnd(MOLECULE_SIZE_MIN, MOLECULE_SIZE_MAX)
      const mol = createMolecule(size)

      const x = rnd(-spreadX, spreadX)
      const y = rnd(-spreadY, spreadY)
      const z = -rnd(Math.abs(Z_MIN), Math.abs(Z_MAX))

      mol.position.set(x, y, z)
      scene.add(mol)
      objects.push(mol)
    }
  }
}

function animate() {
  if (!renderer || !scene || !camera)
    return

  const t = performance.now() * 0.001
  objects.forEach((o, idx) => {
    const s = (o.userData as any)?.rotSpeed
    if (s) {
      o.rotation.x += s.x
      o.rotation.y += s.y
      o.rotation.z += s.z
    }

    // безопасно читаем/инициализируем фазу "боба"
    const ud = o.userData as any
    let phase = ud.bobPhase
    if (phase === undefined || phase === null) {
      phase = idx * 0.3
    }
    ud.bobPhase = phase

    o.position.y += Math.sin(t + phase) * 0.002
  })

  renderer.render(scene, camera)
  rafId = requestAnimationFrame(animate)
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

  const existing = document.getElementById('bg-shapes-canvas')
  if (existing && existing.parentNode)
    existing.parentNode.removeChild(existing)

  const width = window.innerWidth
  const height = window.innerHeight

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.domElement.id = 'bg-shapes-canvas'
  renderer.domElement.style.position = 'fixed'
  renderer.domElement.style.top = '0'
  renderer.domElement.style.left = '0'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  renderer.domElement.style.zIndex = '0'
  renderer.domElement.style.pointerEvents = 'none'
  renderer.domElement.style.filter = 'brightness(0.78) saturate(0.92)'

  document.body.appendChild(renderer.domElement)
  const appRoot = document.querySelector('#app')
  if (appRoot)
    (appRoot as HTMLElement).style.zIndex = '1'

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 4000)
  camera.position.set(0, 0, 120)

  scene.add(new THREE.AmbientLight(0xFFFFFF, 0.14))
  const dir = new THREE.DirectionalLight(0xFFFFFF, 0.06)
  dir.position.set(0.5, 1, 0.5)
  scene.add(dir)

  makeSceneObjects()

  rafId = requestAnimationFrame(animate)
  window.addEventListener('resize', onResize, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)

  // remove objects and dispose resources
  objects.forEach((o) => {
    try {
      if (o.parent)
        o.parent.remove(o)
      // if group contains meshes/lines their geometries/materials are shared and disposed below
    }
    catch (e) {}
  })
  objects.length = 0

  // dispose geometries
  geoms.forEach((g) => {
    try { g.dispose() }
    catch (e) {}
  })
  geoms.length = 0

  // dispose materials
  mats.forEach((m) => {
    try { m.dispose() }
    catch (e) {}
  })
  mats.length = 0

  // dispose textures
  texs.forEach((t) => {
    try { t.dispose() }
    catch (e) {}
  })
  texs.length = 0

  if (renderer) {
    try { renderer.dispose() }
    catch (e) {}
    const el = document.getElementById('bg-shapes-canvas')
    if (el && el.parentNode)
      el.parentNode.removeChild(el)
    renderer = null
  }
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div
    ref="wrapper"
    style="position:fixed;inset:0;pointer-events:none;z-index:-1"
  />
</template>

<style scoped>
/* canvas inline-styles берём в JS; тут ничего не нужно */
</style>
