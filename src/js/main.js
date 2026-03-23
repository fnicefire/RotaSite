;(function () {
  const intro = document.getElementById('intro')
  if (!intro) return

  const wrap = intro.querySelector('.intro-lines')
  for (let i = 0; i < 14; i++) {
    const l = document.createElement('div')
    l.className = 'intro-vline'
    const left  = (i / 13) * 100
    const h     = 80 + Math.random() * 130
    const top   = Math.random() * 55
    const delay = i * 70 + Math.random() * 150
    l.style.cssText = `left:${left}%;top:${top}%;height:${h}px;animation-delay:${delay}ms`
    wrap.appendChild(l)
  }

  const pct = intro.querySelector('.intro-pct')
  let v = 0
  const ct = setInterval(() => {
    v = Math.min(v + Math.floor(Math.random() * 9 + 2), 100)
    if (pct) pct.textContent = v + '%'
    if (v >= 100) clearInterval(ct)
  }, 18)

  setTimeout(() => {
    intro.style.transition = 'opacity .7s ease, transform .7s ease'
    intro.style.opacity = '0'
    intro.style.transform = 'scale(1.03)'
    setTimeout(() => { intro.style.display = 'none'; heroIn() }, 700)
  }, 2400)
})()

function heroIn () {
  const seq = [
    document.querySelector('.hero-tag'),
    document.querySelector('.hero-title'),
    document.getElementById('hero-pfp'),
    document.querySelector('.hero-desc'),
    document.querySelector('.hero-cta'),
    document.querySelector('.hero-scroll')
  ]
  seq.forEach((el, i) => {
    if (!el) return
    setTimeout(() => {
      el.style.transition = 'opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1)'
      el.style.opacity  = '1'
      el.style.transform = 'none'
    }, i * 180)
  })
}

const dot  = document.createElement('div'); dot.className  = 'c-dot'
const ring = document.createElement('div'); ring.className = 'c-ring'
document.body.appendChild(dot)
document.body.appendChild(ring)

let mx = 0, my = 0, rx = 0, ry = 0

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY
  dot.style.left = mx + 'px'; dot.style.top = my + 'px'
})

;(function raf () {
  rx += (mx - rx) * .1; ry += (my - ry) * .1
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
  requestAnimationFrame(raf)
})()

function hookHover () {
  document.querySelectorAll('a, button, [data-h]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'))
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'))
  })
}

const nav = document.querySelector('nav')
if (nav) window.addEventListener('scroll', () =>
  nav.classList.toggle('filled', scrollY > 60), { passive: true })

function initSR () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      const d = +e.target.dataset.delay || 0
      setTimeout(() => e.target.classList.add('in'), d)
      io.unobserve(e.target)
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  document.querySelectorAll('.sr, .sr-l').forEach(el => io.observe(el))
}

function initPS () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { e.target.classList.toggle('in', e.isIntersecting) })
  }, { threshold: 0.15 })
  document.querySelectorAll('.ps').forEach(el => io.observe(el))
}

function initBig () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      e.target.querySelectorAll('.bw').forEach((w, i) =>
        setTimeout(() => w.classList.add('lit'), i * 100))
      io.unobserve(e.target)
    })
  }, { threshold: 0.35 })
  document.querySelectorAll('.big-reveal').forEach(el => io.observe(el))
}

function initTickers () {
  document.querySelectorAll('.t-track, .st-track').forEach(t => {
    t.innerHTML += t.innerHTML
  })
}



function initParallax () {
  const blobs = document.querySelectorAll('.hb1, .hb2')
  let t = false
  document.addEventListener('mousemove', e => {
    if (t) return; t = true
    requestAnimationFrame(() => {
      const x = (e.clientX / innerWidth  - .5) * 20
      const y = (e.clientY / innerHeight - .5) * 15
      blobs.forEach((b, i) => {
        const s = i % 2 ? -1 : 1
        b.style.transform = `translateX(calc(-50% + ${s*x*.4}px)) translateY(${y*.3}px)`
      })
      t = false
    })
  })
}

function initBurger () {
  const burger = document.getElementById('nav-burger')
  const menu   = document.getElementById('mobile-menu')
  if (!burger || !menu) return

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open')
    burger.classList.toggle('open', open)
    document.body.style.overflow = open ? 'hidden' : ''
  })

  menu.querySelectorAll('.mm-link').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open')
      burger.classList.remove('open')
      document.body.style.overflow = ''
    })
  })
}

window.addEventListener('DOMContentLoaded', () => {
  initTickers()
  initParallax()
  initBurger()
  hookHover()
  setTimeout(() => { initSR(); initBig(); initPS() }, 80)
})