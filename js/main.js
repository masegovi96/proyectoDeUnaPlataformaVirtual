function getSidebarHTML(cfg) {
  var b      = cfg.basePath || '';
  var active = cfg.activePage;
  var introPages = ['herramientas', 'proyecto-final', 'examen-diagnostico'];
  var introOpen  = introPages.indexOf(active) !== -1;

  function li(page, href, icon, label) {
    return '<li class="' + (active === page ? 'active' : '') + '">' +
      '<a href="' + b + href + '">' +
      '<i class="' + icon + ' nav-icon"></i>' + label +
      '</a></li>';
  }

  return '' +
    '<div class="sidebar-header">' +
      '<a href="' + b + 'index.html" class="sidebar-brand">' +
        '<i class="fas fa-laptop-code sidebar-brand-icon"></i>' +
        '<span class="sidebar-brand-name">Proyecto de una Plataforma Virtual</span>' +
      '</a>' +
    '</div>' +
    '<ul class="sidebar-nav">' +
      li('home', 'index.html', 'fas fa-home', 'Inicio') +
      '<li class="' + (introOpen ? 'active' : '') + '">' +
        '<a href="#introSubmenu" data-bs-toggle="collapse" role="button"' +
           ' aria-expanded="' + introOpen + '" aria-controls="introSubmenu">' +
          '<i class="fas fa-book-open nav-icon"></i>' +
          'Introducci&oacute;n' +
          '<i class="fas fa-chevron-down chevron"></i>' +
        '</a>' +
        '<ul class="sidebar-submenu collapse ' + (introOpen ? 'show' : '') + '" id="introSubmenu">' +
          '<li class="' + (active === 'herramientas' ? 'active' : '') + '">' +
            '<a href="' + b + 'pages/introduccion/herramientas.html">' +
              '<i class="fas fa-tools"></i> Herramientas de la clase' +
            '</a>' +
          '</li>' +
          '<li class="' + (active === 'proyecto-final' ? 'active' : '') + '">' +
            '<a href="' + b + 'pages/introduccion/proyecto-final.html">' +
              '<i class="fas fa-layer-group"></i> Proyecto Final' +
            '</a>' +
          '</li>' +
          '<li class="' + (active === 'examen-diagnostico' ? 'active' : '') + '">' +
            '<a href="' + b + 'pages/introduccion/examen-diagnostico.html">' +
              '<i class="fas fa-clipboard-check"></i> Examen Diagn&oacute;stico' +
            '</a>' +
          '</li>' +
        '</ul>' +
      '</li>' +
    '</ul>';
}

function getHeaderHTML(cfg) {
  return '' +
    '<button id="sidebarToggle" aria-label="Abrir o cerrar men&uacute;">' +
      '<i class="fas fa-bars"></i>' +
    '</button>' +
    '<span class="page-title">' +
      '<i class="' + cfg.pageIcon + ' nav-icon navbar-page-icon"></i>' +
      cfg.pageTitle +
    '</span>' +
    '<div class="navbar-right">' +
      '<button id="darkModeToggle" class="btn-dark-toggle" aria-label="Cambiar tema" title="Modo oscuro / claro">' +
        '<i class="fas fa-moon" id="darkModeIcon"></i>' +
      '</button>' +
    '</div>';
}

function getFooterHTML() {
  return 'Proyecto de una Plataforma Virtual &copy; 2025';
}

function initDarkMode() {
  var STORAGE_KEY = 'ppv-theme';
  var html = document.documentElement;

  function applyTheme(dark) {
    html.setAttribute('data-bs-theme', dark ? 'dark' : 'light');
    var icon = document.getElementById('darkModeIcon');
    if (icon) icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
  }

  var saved       = localStorage.getItem(STORAGE_KEY);
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved ? saved === 'dark' : prefersDark);

  var btn = document.getElementById('darkModeToggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var nowDark = html.getAttribute('data-bs-theme') === 'dark';
      applyTheme(!nowDark);
      localStorage.setItem(STORAGE_KEY, !nowDark ? 'dark' : 'light');
    });
  }
}

function initSidebarToggle() {
  var sidebar   = document.getElementById('sidebar');
  var content   = document.getElementById('content');
  var overlay   = document.getElementById('overlay');
  var toggleBtn = document.getElementById('sidebarToggle');

  if (!sidebar || !toggleBtn) return;

  function isMobile() { return window.innerWidth < 992; }

  toggleBtn.addEventListener('click', function () {
    if (isMobile()) {
      sidebar.classList.toggle('show');
      overlay.classList.toggle('show');
    } else {
      sidebar.classList.toggle('collapsed');
      content.classList.toggle('expanded');
    }
  });

  overlay.addEventListener('click', function () {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
  });

  var lastMobile = isMobile();
  window.addEventListener('resize', function () {
    var mobile = isMobile();
    if (mobile === lastMobile) return;
    sidebar.classList.remove('show', 'collapsed');
    overlay.classList.remove('show');
    content.classList.remove('expanded');
    lastMobile = mobile;
  });
}

function initCollapse() {
  if (typeof bootstrap === 'undefined') return;
  var el = document.getElementById('introSubmenu');
  if (el) bootstrap.Collapse.getOrCreateInstance(el, { toggle: false });
}

function initPage(cfg) {
  var sidebarEl = document.getElementById('sidebar');
  var topbarEl  = document.getElementById('topbar');
  var footerEl  = document.getElementById('page-footer');

  if (sidebarEl) sidebarEl.innerHTML = getSidebarHTML(cfg);
  if (topbarEl)  topbarEl.innerHTML  = getHeaderHTML(cfg);
  if (footerEl)  footerEl.innerHTML  = getFooterHTML();

  initSidebarToggle();
  initDarkMode();
  initCollapse();
}

function copyText(text, btn) {
  var original = btn.innerHTML;

  function done() {
    btn.innerHTML = '<i class="fas fa-check"></i> Copiado';
    setTimeout(function () { btn.innerHTML = original; }, 1800);
  }

  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(function () { fallback(); done(); });
  } else {
    fallback();
    done();
  }
}
