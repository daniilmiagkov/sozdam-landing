// src/composables/useAutoStagger.ts
import { isRef, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref } from 'vue'

type Options = {
  selector?: string
  base?: number
  step?: number
  observe?: boolean
  startOnView?: boolean
  rootMargin?: string
}

export function useAutoStagger(rootRef: Ref<HTMLElement | null> | HTMLElement | string, opts?: Options) {
  const {
    selector = '.fadeInUp',
    base = 0.05,
    step = 0.12,
    observe = false,
    startOnView = false,
    rootMargin = '0px 0px -10% 0px',
  } = opts || {}

  let mutationObserver: MutationObserver | null = null
  let io: IntersectionObserver | null = null
  const running = ref(false)

  function resolveRoot(): HTMLElement | null {
    if (!rootRef)
      return null
    if (typeof rootRef === 'string') {
      return document.querySelector(rootRef) as HTMLElement | null
    }
    if (isRef(rootRef)) {
      return (rootRef as Ref<HTMLElement | null>).value
    }
    // here rootRef should be an HTMLElement
    return (rootRef as HTMLElement) ?? null
  }

  function getElementsInDomOrder(root: HTMLElement, selectorLocal: string) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
      acceptNode(node: Node) {
        const el = node as Element
        return el instanceof Element && el.matches(selectorLocal) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      },
    } as unknown as NodeFilter) // TS quirk: pass NodeFilter-compatible object
    const result: Element[] = []
    let cur = walker.nextNode()
    while (cur) {
      if (cur instanceof Element)
        result.push(cur)
      cur = walker.nextNode()
    }
    return result
  }

  function applyDelaysToElements(rootEl: HTMLElement) {
    const els = getElementsInDomOrder(rootEl, selector)
    els.forEach((el, idx) => {
      if (!(el instanceof HTMLElement))
        return
      const delay = `${(base + idx * step).toFixed(3)}s`
      // записываем CSS-переменную
      el.style.setProperty('--delay', delay)
      // форсим reflow чтобы браузер увидел новую переменную до запуска анимации
      void (el.offsetWidth)
      // добавляем класс, который содержит свойства animation (запустит анимацию с delay)
      el.classList.add('fadeInUp--play')
      el.setAttribute('data-staggered', 'true')
    })
  }

  function observeWhenVisible(rootEl: HTMLElement) {
    if (io)
      io.disconnect()
    io = new IntersectionObserver((entries) => {
    // собираем видимые в порядке их появления в документе
      const visible = entries
        .filter(e => e.isIntersecting)
        .map(e => e.target as Element)

      // сортируем видимые по position в документе (document order)
      visible.sort((a, b) => {
        const pos = a.compareDocumentPosition(b)
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING)
          return -1
        if (pos & Node.DOCUMENT_POSITION_PRECEDING)
          return 1
        return 0
      })

      // применяем delay для всех элементов, но запускаем анимацию только у видимых
      const all = getElementsInDomOrder(rootEl, selector)
      all.forEach((el, idx) => {
        if (!(el instanceof HTMLElement))
          return
        const delay = `${(base + idx * step).toFixed(3)}s`
        el.style.setProperty('--delay', delay)
        if (visible.includes(el) && !el.classList.contains('fadeInUp--play')) {
          void (el.offsetWidth)
          el.classList.add('fadeInUp--play')
          el.setAttribute('data-staggered-visible', 'true')
        }
      })
    }, { root: null, rootMargin })
    const els = getElementsInDomOrder(rootEl, selector)
    els.forEach(el => io!.observe(el))
  }

  function init() {
    const rootEl = resolveRoot()
    if (!rootEl)
      return
    if (!startOnView) {
      applyDelaysToElements(rootEl)
    }
    else {
      observeWhenVisible(rootEl)
    }

    if (observe) {
      mutationObserver = new MutationObserver(() => {
        window.requestAnimationFrame(() => {
          if (!startOnView) {
            applyDelaysToElements(rootEl)
          }
          else {
            if (io) {
              io.disconnect()
              observeWhenVisible(rootEl)
            }
          }
        })
      })
      mutationObserver.observe(rootEl, { childList: true, subtree: true })
    }
    running.value = true
  }

  function stop() {
    if (mutationObserver) {
      mutationObserver.disconnect()
      mutationObserver = null
    }
    if (io) {
      io.disconnect()
      io = null
    }
    running.value = false
  }

  onMounted(() => {
    nextTick(() => init())
  })
  onBeforeUnmount(() => stop())

  return {
    stop,
    running,
  }
}
