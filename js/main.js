// main.js — PPV
// Genera el sidebar, topbar y footer, y gestiona la interactividad (colapso, tema).
// Compatible con la estructura .sidebar / .app-container del diseño glassmorphism.

function getSidebarHTML(cfg) {
  var b = cfg.basePath || '';
  var active = cfg.activePage;
  var introPages = ['herramientas', 'proyecto-final', 'examen-diagnostico'];
  var introOpen = introPages.indexOf(active) !== -1;
  var chevRot = introOpen ? 'transform:rotate(-180deg);' : '';
  var unidad1Pages = ['presentacion', 'actividad-participacion-1', 'tarea-1', 'actividad-participacion-2', 'tarea-2', 'tarea-3', 'entregable-1'];
  var unidad1Open = unidad1Pages.indexOf(active) !== -1;
  var chevRot1 = unidad1Open ? 'transform:rotate(-180deg);' : '';

  function navLink(page, href, icon, label) {
    var isActive = active === page;
    return '<a href="' + b + href + '" class="nav-link' + (isActive ? ' active' : '') + '">'
      + '<i class="' + icon + '"></i>'
      + '<span class="nav-label">' + label + '</span>'
      + '</a>';
  }

  return ''
    + '<div class="sidebar-header">'
    + '<div class="sidebar-brand"><h2>Proyecto de una Plataforma Virtual</h2></div>'
    + '</div>'
    + '<nav class="sidebar-nav" id="sidebar-nav">'
    + '<ul>'
    + '<li class="nav-item">' + navLink('home', 'index.html', 'fas fa-home', 'Inicio') + '</li>'
    + '<li class="nav-item accordion-item">'
    + '<div class="nav-link accordion-toggle' + (introOpen ? ' active' : '') + '" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;">'
    + '<div style="display:flex;align-items:center;">'
    + '<i class="fas fa-book-open"></i>'
    + '<span class="nav-label">Introducción</span>'
    + '</div>'
    + '<i class="fas fa-chevron-down accordion-icon nav-label" style="transition:transform 0.3s ease;' + chevRot + '"></i>'
    + '</div>'
    + '<ul class="submenu" style="display:' + (introOpen ? 'block' : 'none') + ';padding-left:1.5rem;list-style:none;margin:0.5rem 0;">'
    + '<li class="nav-item" style="margin-bottom:0.5rem;">' + navLink('herramientas', 'pages/introduccion/herramientas/', 'fas fa-toolbox', 'Herramientas') + '</li>'
    + '<li class="nav-item" style="margin-bottom:0.5rem;">' + navLink('proyecto-final', 'pages/introduccion/proyecto-final/', 'fas fa-rocket', 'Proyecto Final') + '</li>'
    + '<li class="nav-item">' + navLink('examen-diagnostico', 'pages/introduccion/examen-diagnostico/', 'fas fa-clipboard-check', 'Diagnóstico') + '</li>'
    + '</ul>'
    + '</li>'
    + '<li class="nav-item accordion-item">'
    + '<div class="nav-link accordion-toggle' + (unidad1Open ? ' active' : '') + '" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;">'
    + '<div style="display:flex;align-items:center;">'
    + '<i class="fas fa-layer-group"></i>'
    + '<span class="nav-label">Unidad 1.- Ing. de Requerimientos</span>'
    + '</div>'
    + '<i class="fas fa-chevron-down accordion-icon nav-label" style="transition:transform 0.3s ease;' + chevRot1 + '"></i>'
    + '</div>'
    + '<ul class="submenu" style="display:' + (unidad1Open ? 'block' : 'none') + ';padding-left:1.5rem;list-style:none;margin:0.5rem 0;">'
    + '<li class="nav-item" style="margin-bottom:0.5rem;">' + navLink('presentacion', 'pages/unidad1/presentacion/', 'fas fa-chalkboard-teacher', 'Presentación') + '</li>'
    + '<li class="nav-item" style="margin-bottom:0.5rem;">' + navLink('actividad-participacion-1', 'pages/unidad1/actividad-participacion-1/', 'fas fa-comments', 'Actividad de Participación 1') + '</li>'
    + '<li class="nav-item">' + navLink('tarea-1', 'pages/unidad1/tarea-1/', 'fas fa-tasks', 'Tarea 1') + '</li>'
    + '<li class="nav-item">' + navLink('actividad-participacion-2', 'pages/unidad1/actividad-participacion-2/', 'fas fa-comments', 'Actividad de Participación 2') + '</li>'
    + '<li class="nav-item">' + navLink('tarea-2', 'pages/unidad1/tarea-2/', 'fas fa-tasks', 'Tarea 2') + '</li>'
    + '<li class="nav-item">' + navLink('tarea-3', 'pages/unidad1/tarea-3/', 'fas fa-tasks', 'Tarea 3') + '</li>'
    + '<li class="nav-item">' + navLink('entregable-1', 'pages/unidad1/entregable-1/', 'fas fa-tasks', 'Proyecto Final Primer Entregable') + '</li>'
    + '</ul>'
    + '</li>'
    + '</ul>'
    + '</nav>'
    + '<div class="sidebar-bottom">'
    + '<button class="theme-toggle-btn" id="theme-toggle-btn" title="Cambiar tema">'
    + '<i class="fa-solid fa-sun" id="theme-icon"></i>'
    + '<span class="nav-label" id="theme-label">Modo claro</span>'
    + '</button>'
    + '</div>';
}

function getHeaderHTML(cfg) {
  return ''
    + '<button id="sidebarToggle" aria-label="Abrir o cerrar menú"><i class="fas fa-bars"></i></button>'
    + '<span class="page-title">'
    + '<i class="' + (cfg.pageIcon || '') + ' navbar-page-icon"></i>' + (cfg.pageTitle || '')
    + '</span>'
    + '<div class="navbar-right">'
    + '<button id="darkModeToggle" class="btn-dark-toggle" aria-label="Cambiar tema">'
    + '<i class="fas fa-moon" id="darkModeIcon"></i>'
    + '</button>'
    + '</div>';
}

function initTheme() {
  var KEY = 'ppv-theme';
  var html = document.documentElement;

  function applyTheme(dark) {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    var sidebarIcon = document.getElementById('theme-icon');
    var sidebarLabel = document.getElementById('theme-label');
    var navbarIcon = document.getElementById('darkModeIcon');
    if (sidebarIcon) sidebarIcon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    if (sidebarLabel) sidebarLabel.textContent = dark ? 'Modo claro' : 'Modo oscuro';
    if (navbarIcon) navbarIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    try { localStorage.setItem(KEY, dark ? 'dark' : 'light'); } catch (e) { }
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { }
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var dark = saved ? saved === 'dark' : prefersDark;
  applyTheme(dark);

  // Sidebar theme button
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('#theme-toggle-btn')) {
      applyTheme(html.getAttribute('data-theme') !== 'dark');
    }
    if (e.target.closest && e.target.closest('#darkModeToggle')) {
      applyTheme(html.getAttribute('data-theme') !== 'dark');
    }
  });
}

function initSidebar() {
  var sidebar = document.getElementById('sidebar');
  var content = document.getElementById('content');
  var overlay = document.getElementById('overlay');
  var topToggle = document.getElementById('sidebarToggle');
  var mainContent = document.querySelector('.main-content');

  if (!sidebar) return;

  function isMobile() { return window.innerWidth <= 768; }

  function setSidebarOpen(open) {

    if (isMobile()) {
      sidebar.classList.toggle('open', open);
      if (overlay) overlay.classList.toggle('show', open);
    } else {
      if (open) {
        document.body.classList.remove('sidebar-collapsed');
        sidebar.classList.remove('collapsed');
        if (content) content.classList.remove('expanded');
        if (mainContent) {
          mainContent.style.marginLeft = 'var(--sidebar-width)';
          mainContent.style.maxWidth = 'calc(100vw - var(--sidebar-width))';
          mainContent.style.paddingLeft = '';
        }
      } else {
        document.body.classList.add('sidebar-collapsed');
        sidebar.classList.add('collapsed');
        if (content) content.classList.add('expanded');
        if (mainContent) {
          mainContent.style.marginLeft = '0';
          mainContent.style.maxWidth = '100vw';
          mainContent.style.paddingLeft = '5rem';
        }
      }
    }

    try { localStorage.setItem('ppv-sidebar', open ? '1' : '0'); } catch (e) { }
  }

  var saved = null;
  try { saved = localStorage.getItem('ppv-sidebar'); } catch (e) { }
  setSidebarOpen(saved !== null ? saved === '1' : !isMobile());

  function toggle() {
    var open = isMobile() ? sidebar.classList.contains('open') : !document.body.classList.contains('sidebar-collapsed');
    setSidebarOpen(!open);
  }

  if (topToggle) topToggle.addEventListener('click', toggle);
  if (overlay) overlay.addEventListener('click', function () { setSidebarOpen(false); });

  document.addEventListener('click', function (e) {
    if (isMobile() && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && (!topToggle || !topToggle.contains(e.target))) {
        setSidebarOpen(false);
      }
    }
  });

  window.addEventListener('resize', function () {
    if (!isMobile() && overlay) overlay.classList.remove('show');
  });
}

function initAccordion() {
  var toggles = document.querySelectorAll('.accordion-toggle');
  toggles.forEach(function (toggle) {
    var item = toggle.closest('.accordion-item');
    var submenu = item ? item.querySelector('.submenu') : null;
    if (!submenu) return;

    toggle.addEventListener('click', function () {
      var icon = toggle.querySelector('.accordion-icon');
      var isOpen = submenu.style.display === 'block';
      submenu.style.display = isOpen ? 'none' : 'block';
      if (icon) icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(-180deg)';
      toggle.classList.toggle('active', !isOpen);
    });
  });
}

function initPage(cfg) {
  var sidebarEl = document.getElementById('sidebar');
  var topbarEl = document.getElementById('topbar');
  var footerEl = document.getElementById('page-footer');

  if (sidebarEl) sidebarEl.innerHTML = getSidebarHTML(cfg);
  if (topbarEl) topbarEl.innerHTML = getHeaderHTML(cfg);
  if (footerEl) footerEl.innerHTML = '&copy; 2026 Proyecto de una Plataforma Virtual. Todos los derechos reservados.';

  initTheme();
  initSidebar();
  initAccordion();

  // Fade-in animations
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.card, .phase-card, .diag-block, .eval-table tr').forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.45s ease ' + (i * 0.06) + 's, transform 0.45s ease ' + (i * 0.06) + 's';
      observer.observe(el);
    });
  }
}
