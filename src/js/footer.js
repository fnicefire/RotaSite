const FA_ICONS = {
  github:    'fa-brands fa-github',
  discord:   'fa-brands fa-discord',
  x:         'fa-brands fa-x-twitter',
  instagram: 'fa-brands fa-instagram',
  youtube:   'fa-brands fa-youtube',
  twitch:    'fa-brands fa-twitch',
  tiktok:    'fa-brands fa-tiktok',
  gamepad:   'fa-solid fa-gamepad',
  reddit:    'fa-brands fa-reddit',
  globe:     'fa-solid fa-globe'
}

function base () { return document.body.dataset.base || '' }

async function renderFooter () {
  await Promise.all([renderLinks(), renderAvatar()])
}

async function renderLinks () {
  const el = document.getElementById('footer-links')
  if (!el) return
  try {
    const r = await fetch(base() + '/assets/links.json')
    const links = await r.json()
    el.innerHTML = links.map(l => {
      const ico = FA_ICONS[l.icon] || FA_ICONS.globe
      const lbl = l.label || l.name
      if (!l.url || l.url === null || l.url === '' || l.url === 'null') {
        return `<span class="fl disabled" title="Coming Soon"><i class="${ico}"></i><span>${lbl}</span></span>`
      }
      return `<a href="${l.url}" target="_blank" rel="noopener" class="fl"><i class="${ico}"></i><span>${lbl}</span></a>`
    }).join('')
    el.querySelectorAll('a.fl').forEach(a => {
      a.addEventListener('mouseenter', () => document.body.classList.add('hov'))
      a.addEventListener('mouseleave', () => document.body.classList.remove('hov'))
    })
  } catch (e) {
    console.warn('[footer.js] Could not load links.json', e)
  }
}

function renderAvatar () {
  const img = document.getElementById('footer-av')
  if (!img) return
  img.src = base() + '/assets/profile_picture.webp'
  img.onerror = () => {
    img.style.display = 'none'
    const fb = document.getElementById('footer-av-fb')
    if (fb) fb.style.display = 'flex'
  }
}

window.addEventListener('DOMContentLoaded', renderFooter)