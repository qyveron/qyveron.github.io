(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Service content
  const SERVICES = {
    web: { t: 'Web Development', d: 'Modern, responsive websites and digital experiences that load fast, look polished and work on every device.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'SEO'],
      ben: ['Responsive on phones, tablets and desktops', 'Fast loading and search-friendly', 'Clean design that reflects your brand', 'Easy to maintain and extend'] },
    soft: { t: 'Software Solutions', d: 'Custom software designed around the way your business actually works, from internal tools to full platforms.',
      tech: ['Python', 'Java', 'Node.js', 'REST APIs', 'SQL', 'Cloud'],
      ben: ['Built around your own processes', 'Scales as your business grows', 'Secure, structured data handling', 'Fewer manual tasks and less rework'] },
    ai: { t: 'AI & Automation', d: 'Intelligent automation and practical AI-powered solutions that save time on repetitive work and support better decisions.',
      tech: ['Python', 'LLM APIs', 'Workflow automation', 'Data processing', 'Chatbots'],
      ben: ['Less time spent on repetitive tasks', 'Practical AI, focused on real use cases', 'Faster, more consistent operations', 'Insights from your own data'] },
    dig: { t: 'Digital Solutions', d: 'Technology-driven solutions that help your business move from manual processes to connected, modern operations.',
      tech: ['Business systems', 'Dashboards', 'Integrations', 'Analytics', 'Cloud tools'],
      ben: ['A clear path to going digital', 'Connected tools and data in one place', 'Better visibility into your business', 'Support for long-term growth'] }
  };

  // Modal
  const modal = $('#modal');
  let lastTrigger = null;
  const openSvc = (key, trigger) => {
    const s = SERVICES[key]; if (!s) return;
    lastTrigger = trigger;
    $('#m-title').textContent = s.t;
    $('#m-desc').textContent = s.d;
    $('#m-tech').replaceChildren(...s.tech.map(x => Object.assign(document.createElement('span'), { textContent: x })));
    $('#m-ben').replaceChildren(...s.ben.map(x => Object.assign(document.createElement('li'), { textContent: x })));
    modal.showModal();
  };
  const closeModal = () => { modal.close(); lastTrigger && lastTrigger.focus && lastTrigger.focus(); };
  $$('.svc').forEach(b => b.addEventListener('click', () => openSvc(b.dataset.svc, b)));
  $$('.fgrid [data-svc]').forEach(a => a.addEventListener('click', () => setTimeout(() => openSvc(a.dataset.svc, a), 450)));
  $('#close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  $('#m-go').addEventListener('click', () => modal.close());

  // Mobile menu
  const burger = $('#burger'), menu = $('#menu');
  const setMenu = open => {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width:861px)').addEventListener('change', () => setMenu(false));

  // Sticky nav state + active link
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('sc', scrollY > 20);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });
  const links = $$('.menu a[data-s]');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id === 'vision' ? 'why' : e.target.id;
    links.forEach(l => l.classList.toggle('on', l.dataset.s === id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  // Scroll reveal
  const rv = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); }
  }), { threshold: .12 });
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + 'ms'; rv.observe(el); });

  // Footer
  $('#yr').textContent = new Date().getFullYear();
  $('#top').addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); });
})();
