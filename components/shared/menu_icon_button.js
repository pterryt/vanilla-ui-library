import { ICONS } from "../../paths.js"

export function create_menu_icon_button(svg, label, on_click) {
  const button = document.createElement('button');
  button.classList.add('c-menu-icon-button');
  button.setAttribute('aria-label', label);

  if (on_click) {
    button.addEventListener('click', on_click);
  }

  const icon = document.createElement('img');
  icon.src = svg;
  icon.alt = label;
  button.appendChild(icon);

  const state = {};
  return button;
}


export function create_settings_button() {
  return create_menu_icon_button(ICONS.settings, 'Settings');
}

// TODO: break this out, doesn't fit here
export function create_home_button() {
  const a = document.createElement('a');
  a.className = 'c-menu-icon-link';
  a.href = '#home';

  const icon = document.createElement('img');
  icon.src = ICONS.home;
  icon.alt = 'Home';
  a.appendChild(icon);
  return a;
}

export function create_user_button() {
  return create_menu_icon_button(ICONS.user, 'User');
}

export function create_locale_button() {
  return create_menu_icon_button(ICONS.locale, 'Local');
}

export function create_theme_button() {
  return create_menu_icon_button(ICONS.theme, 'Theme');
}