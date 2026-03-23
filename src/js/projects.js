async function loadArchive () {
  const list = document.getElementById('archive-list')
  if (!list) return

  const statusIcon = {
    'Active':      'fa-circle-dot',
    'In Dev':      'fa-code-branch',
    'Open Source': 'fa-code',
    'Closed':      'fa-circle-xmark',
    'Past':        'fa-clock-rotate-left',
  }

  try {
    const r = await fetch('/assets/projects.json')
    const all = await r.json()
    const repos = all.filter(p => {
      if (p.show === undefined || p.show === null) return true
      if (p.show === false || p.show === 0) return false
      if (typeof p.show === 'string' && p.show.toLowerCase() === 'false') return false
      return true
    })

    list.innerHTML = repos.map((p, i) => {
      const isLink = !!p.link
      const tag    = isLink ? `a href="${p.link}" target="_blank" rel="noopener"` : 'div'
      const close  = isLink ? 'a' : 'div'
      const icon   = statusIcon[p.status] || 'fa-circle'
      const tags   = (p.tags || []).map(t => `<span class="ai-tag">${t}</span>`).join('')

      return `
      <${tag} class="ai">
        <span class="ai-n">${String(i + 1).padStart(2, '0')}</span>
        <span class="ai-name">${p.name.toUpperCase()}</span>
        <span class="ai-status ai-status--${(p.status || '').toLowerCase().replace(/\s/g, '-')}">
          <i class="fa-solid ${icon}"></i> ${p.status || ''}
        </span>
        <div class="ai-tags">${tags}</div>
        <span class="ai-arrow"><i class="fa-solid fa-arrow-up-right"></i></span>
      </${close}>`
    }).join('')

    setTimeout(() => {
      list.querySelectorAll('.ai').forEach((el, i) => {
        setTimeout(() => {
          el.style.transition = 'opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1), padding-left .3s cubic-bezier(.16,1,.3,1)'
          el.style.opacity   = '1'
          el.style.transform = 'none'
        }, i * 90)
      })
      list.querySelectorAll('.ai').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hov'))
        el.addEventListener('mouseleave', () => document.body.classList.remove('hov'))
      })
    }, 60)
  } catch (e) {
    list.innerHTML = `<p style="font-family:var(--f-mono);color:var(--p3);padding:28px 0;font-size:.72rem"><i class="fa-solid fa-triangle-exclamation"></i> Could not load projects.</p>`
  }
}

window.addEventListener('DOMContentLoaded', loadArchive)