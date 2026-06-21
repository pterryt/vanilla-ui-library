import {
  create_home_button,
  create_settings_button,
  create_locale_button,
  create_theme_button,
  create_user_button
} from "./menu_icon_button.js";

export function create_nav_bar() {
  const nav = document.createElement('nav');
  nav.classList.add('c-nav-bar');

  const state = {
    has_user: false,
    has_settings: true,
    has_theme: true,
    has_locale: true,
    has_home: true
  };

  const containers = create_containers();
  const links = create_links();

  render_links(containers.center);
  render_menu_buttons();

  return nav;

  function create_containers() {
    const left = document.createElement('div');
    left.className = 'c-nav-bar-left-container';

    const center = document.createElement('div');
    center.className = 'c-nav-bar-center-container';

    const right = document.createElement('div');
    right.className = 'c-nav-bar-right-container';

    nav.append(left, center, right);

    return {left, center, right};
  }

  function create_links() {
    return [{label: "Gallery", href: "#gallery"},
      {label: "Reader", href: "#reader"}, {label: "Table", href: "#table"},
      {label: "Statistics", href: "#statistics"}];
  }

  function render_links(centerContainer) {
    for (const link of links) {
      const a = document.createElement('a');
      a.className = 'c-nav-bar-link';
      a.textContent = link.label;
      a.href = link.href;

      centerContainer.appendChild(a);
    }
  }

  function render_menu_buttons() {
    if (state.has_settings) {
      render_settings_button()
    }

  }

  function render_settings_button() {
    const setting_button = create_settings_button()
    containers.right.appendChild(setting_button);
  }

  function render_home_button() {
    const home_button = create_home_button()
    containers.right.appendChild(home_button);
  }
}
