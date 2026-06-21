export function create_menu_icon_button(svg, label, on_click) {
  const button = document.createElement('button');
  button.classList.add('c-menu-button-icon');
  button.label = label;
  button.setAttribute('aria-label', label);
  button.addEventListener('click', on_click);

  const state = {};
}
