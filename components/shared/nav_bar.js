export function create_nav_bar() {
  const nav = document.createElement('nav');
  nav.classList.add('c-nav-bar');

  const state = {
    hasUser: false,
    hasSettings: true,
    hasTheme: true,
  };

  const containers = createContainers();
  const links = createLinks();

  renderLinks(containers.center);

  return nav;

  // ---------- internal helpers ----------

  function createContainers() {
    const left = document.createElement('div');
    left.className = 'c-nav-bar-left-container';

    const center = document.createElement('div');
    center.className = 'c-nav-bar-center-container';

    const right = document.createElement('div');
    right.className = 'c-nav-bar-right-container';

    nav.append(left, center, right);

    return { left, center, right };
  }

  function createLinks() {
    return [
      { label: "Gallery", href: "views/gallery_page.html" },
      { label: "Reader", href: "views/reader_page.html" },
      { label: "Table", href: "views/table_page.html" },
      { label: "Statistics", href: "views/statistics_page.html" }
    ];
  }

  function renderLinks(centerContainer) {
    for (const link of links) {
      const a = document.createElement('a');
      a.className = 'c-nav-bar-link';
      a.textContent = link.label;
      a.href = link.href;

      centerContainer.appendChild(a);
    }
  }
}
