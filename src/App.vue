<script setup>
import { onBeforeUnmount, onMounted, useCssModule } from 'vue'
import gsap from 'gsap'
import { ScrollSmoother, ScrollToPlugin, ScrollTrigger } from 'gsap/all' // ScrollSmoother — опционально
import ArchitectureSection from './components/sections/Architecture.vue'
import DatasetSection from './components/sections/Dataset.vue'
import DemoSection from './components/sections/Demo.vue'
import RelevanceSection from './components/sections/Relevance.vue'
import TeamSection from './components/sections/Team.vue'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother)

const styles = useCssModule()
let ctx
let smoother = null

onMounted(() => {
  ctx = gsap.context(() => {
    // Попробуем создать ScrollSmoother (если плагин доступен)
    try {
      if (typeof ScrollSmoother !== 'undefined' && ScrollSmoother.create) {
        smoother = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.0, // интенсивность сглаживания
          effects: true, // включает data-speed/data-lag эффект из ScrollSmoother
        })
        console.log('ScrollSmoother initialized')
      }
      else {
        console.warn('ScrollSmoother not available — fallback to native/GSAP scroll')
      }
    }
    catch (err) {
      console.warn('Failed to init ScrollSmoother:', err)
      smoother = null
    }

    // секции — ищем панели внутри content
    const panels = Array.from(document.querySelectorAll('[data-panel]'))

    panels.forEach((panel, i) => {
      const line = panel.querySelector('[data-line]')
      if (!line)
        return

      // при наличии ScrollSmoother ScrollTrigger автоматически подхватит smoothed scroll
      gsap.fromTo(
        line,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top top',
            end: '+=100%',
            scrub: true,
            pin: true,
          },
        },
      )
    })

    // Навигация: используем data-nav-link атрибуты
    const links = Array.from(document.querySelectorAll('nav [data-nav-link]'))
    links.forEach((a) => {
      const href = a.getAttribute('href')
      const target = document.querySelector(href)
      if (!target)
        return

      ScrollTrigger.create({
        trigger: target,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActive(a),
        onEnterBack: () => setActive(a),
      })

      a.addEventListener('click', (e) => {
        e.preventDefault()
        // Если есть ScrollSmoother — используем его API для прокрутки
        if (smoother && typeof smoother.scrollTo === 'function') {
          smoother.scrollTo(target, { offset: 0, duration: 1 })
        }
        else {
          // fallback — gsap scrollTo (или нативный через CSS html {scroll-behavior:smooth} уже включён)
          gsap.to(window, { duration: 1, scrollTo: { y: target, autoKill: false } })
        }
      })
    })

    function setActive(link) {
      links.forEach(l => l.classList.remove(styles.active))
      link.classList.add(styles.active)
    }

    // После инициализации — пересчитаем триггеры
    ScrollTrigger.refresh()
  })
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
  // убираем ScrollSmoother если создан
  try {
    if (smoother && typeof smoother.kill === 'function') {
      smoother.kill()
      smoother = null
    }
  }
  catch (e) {
    console.warn('Error while killing smoother', e)
  }
  ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>

<template>
  <div :class="styles.pagesScroll">
    <nav :class="styles.nav">
      <a
        href="#relevance"
        data-nav-link
      >Relevance</a>
      <a
        href="#architecture"
        data-nav-link
      >Architecture</a>
      <a
        href="#dataset"
        data-nav-link
      >Dataset</a>
      <a
        href="#team"
        data-nav-link
      >Team</a>
      <a
        href="#demo"
        data-nav-link
      >Demo</a>
    </nav>

    <!-- wrapper/content required for ScrollSmoother -->
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <!-- Relevance -->
        <section
          id="relevance"
          :class="[styles.panel]"
          data-panel
        >
          <div :class="styles.inner">
            <span
              data-line
              :class="styles.line"
            />
            <RelevanceSection />
          </div>
        </section>

        <!-- Architecture -->
        <section
          id="architecture"
          :class="[styles.panel]"
          data-panel
        >
          <div :class="styles.inner">
            <span
              data-line
              :class="styles.line"
            />
            <ArchitectureSection />
          </div>
        </section>

        <!-- Dataset -->
        <section
          id="dataset"
          :class="[styles.panel]"
          data-panel
        >
          <div :class="styles.inner">
            <span
              data-line
              :class="styles.line"
            />
            <DatasetSection />
          </div>
        </section>

        <!-- Team -->
        <section
          id="team"
          :class="[styles.panel]"
          data-panel
        >
          <div :class="styles.inner">
            <span
              data-line
              :class="styles.line"
            />
            <TeamSection />
          </div>
        </section>

        <!-- Demo -->
        <section
          id="demo"
          :class="[styles.panel]"
          data-panel
        >
          <div :class="styles.inner">
            <span
              data-line
              :class="styles.line"
            />
            <DemoSection />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style module>
.pagesScroll {
  position: relative;
  font-family: Inter, system-ui, sans-serif;
}

/* нативный fallback */
html {
  scroll-behavior: smooth;
}

/* wrapper/content для ScrollSmoother — плагин управляет transform/overflow сам */
#smooth-wrapper {
  position: relative;
  overflow: hidden;
}

/* nav */
.nav {
  position: fixed;
  top: 14px;
  right: 14px;
  z-index: 60;
  background: rgba(0, 0, 0, 0.55);
  padding: 8px 12px;
  border-radius: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
.nav a {
  color: #fff;
  text-decoration: none;
  opacity: 0.7;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 6px;
}
.active {
  opacity: 1;
  background: rgba(255, 255, 255, 0.08);
}

/* panels */
.panel {
  min-height: 100vh;
  box-sizing: border-box;
  /* padding: 48px 24px; */
  display: flex;
  align-items: center;
}

.line {
  display: block;
  width: 100%;
  max-width: 860px;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.9);
  transform-origin: left center;
  will-change: transform;
  border-radius: 9999px;
}

/* typography */
h1 {
  font-size: 2rem;
  margin: 0 0 12px 0;
  font-weight: 500;
}
h2 {
  font-size: 1.5rem;
  margin: 0 0 12px 0;
}
p {
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 12px 0;
}

/* helpers */
.scrollDown {
  margin-top: 12px;
  opacity: 0.85;
}
.arrow {
  margin-left: 8px;
  display: inline-block;
  transform: translateY(0);
}

/* responsive */
@media (min-width: 900px) {
  .nav a {
    font-size: 15px;
  }
}
</style>
