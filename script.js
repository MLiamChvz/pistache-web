'use strict';

// Navegación adaptable y accesible.
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
  mobileMenu.hidden = true;
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileMenu.hidden = !open;
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  if (!mobileMenu.hidden && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});
window.addEventListener('resize', () => { if (innerWidth > 820) closeMenu(); }, {passive: true});

// Indicador de lectura y botón de regreso.
const progress = document.getElementById('readingProgress');
const backToTop = document.getElementById('backToTop');
function updateScroll() {
  const available = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${available > 0 ? Math.min(100, scrollY / available * 100) : 0}%`;
  backToTop.classList.toggle('visible', scrollY > 700);
}
window.addEventListener('scroll', updateScroll, {passive: true});
window.addEventListener('resize', updateScroll, {passive: true});
backToTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}));
updateScroll();

// Animaciones de entrada progresivas, desactivadas si el usuario lo prefiere.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('js-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .08, rootMargin: '0px 0px 30px 0px'});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Resaltar la sección activa del menú.
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.desktop-nav a')];
  const targets = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const href = `#${entry.target.id}`;
        links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === href));
      }
    });
  }, {rootMargin: '-20% 0px -65% 0px', threshold: 0});
  targets.forEach(target => activeObserver.observe(target));
}

// Galería de los tres modelos de Blender.
const models = [
  {id: 'primario', title: 'Packaging primario', kicker: '01 / CONSUMO INDIVIDUAL', image: 'assets/primario.webp', alt: 'Render ampliado del bowl primario con compartimiento central y tapa crema PISTACHÉ', description: 'Bowl reutilizable de 15 × 15 × 4,5 cm. Incorpora una tapa crema y un compartimiento central para depositar las cáscaras. La gráfica verde y crema se inspira en las formas del pistacho.'},
  {id: 'secundario', title: 'Packaging secundario', kicker: '02 / PRESENTACIÓN AGRUPADA', image: 'assets/secundario.webp', alt: 'Dos vistas 3D de un secundario de cartón con forma de pistacho que agrupa seis bowls', description: 'Estructura vertical de 18 × 18 × 30 cm para agrupar seis bowls apilados. El render muestra dos alternativas de simplificación de la cáscara, pensadas para una posible fabricación en cartón.'},
  {id: 'terciario', title: 'Packaging terciario', kicker: '03 / EMBALAJE DE TRANSPORTE', image: 'assets/terciario.webp', alt: 'Vista ampliada de la caja terciaria abierta, la capa superior y la caja con los bowls', description: 'Caja propuesta de 48 × 33 × 12 cm para transportar doce primarios en dos niveles de seis. En el render se visualiza la capa superior; el sistema contempla separadores y una plancha intermedia.'}
];
let activeModel = 0;
const dialog = document.getElementById('modelDialog');
const dialogImage = document.getElementById('dialogImage');
const dialogTitle = document.getElementById('dialogTitle');
const dialogKicker = document.getElementById('dialogKicker');
const dialogBody = document.getElementById('dialogBody');
const dialogCount = document.getElementById('dialogCount');
const dialogClose = document.getElementById('dialogClose');
let lastTrigger = null;
function renderModel(index) {
  activeModel = (index + models.length) % models.length;
  const model = models[activeModel];
  dialogImage.src = model.image;
  dialogImage.alt = model.alt;
  dialogTitle.textContent = model.title;
  dialogKicker.textContent = model.kicker;
  dialogBody.textContent = model.description;
  dialogCount.textContent = `${String(activeModel + 1).padStart(2,'0')} / 03`;
}
document.querySelectorAll('[data-model]').forEach(button => {
  button.addEventListener('click', () => {
    const idx = models.findIndex(model => model.id === button.dataset.model);
    if (idx < 0) return;
    lastTrigger = button;
    renderModel(idx);
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    document.body.classList.add('no-scroll');
  });
});
function closeDialog() {
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
  document.body.classList.remove('no-scroll');
  if (lastTrigger) lastTrigger.focus();
}
dialogClose.addEventListener('click', closeDialog);
dialog.addEventListener('close', () => {
  document.body.classList.remove('no-scroll');
  if (lastTrigger) lastTrigger.focus();
});
dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(); });
document.getElementById('prevModel').addEventListener('click', () => renderModel(activeModel - 1));
document.getElementById('nextModel').addEventListener('click', () => renderModel(activeModel + 1));
dialog.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {e.preventDefault();renderModel(activeModel-1);}
  if (e.key === 'ArrowRight') {e.preventDefault();renderModel(activeModel+1);}
});

document.getElementById('year').textContent = String(new Date().getFullYear());
