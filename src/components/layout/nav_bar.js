import {CDropdownMenu} from "@app/src/components/shared/dropdown_menu.js"
import {ThemeService} from "@app/src/theme.js";
import {Disposable} from "@app/src/disposable.js"
import {LocaleService} from "@app/src/locale.js";

import {
  create_home_button,
  create_settings_button,
  create_locale_button,
  create_theme_button,
  create_user_button
} from "../shared/menu_icon_button.js";

export function create_nav_bar(app_store) {

  const lifecycle = Disposable.create_disposable_scope();
  lifecycle.own(app_store.subscribe(s => s.locale, render_links))
  const nav = document.createElement('nav');
  nav.classList.add('c-nav-bar');

  const local_state = {
    has_user: false,
    has_settings: true,
    has_theme: true,
    has_locale: true,
    has_home: true
  };

  const containers = create_containers();

  render_links();
  render_menu_buttons();

  return {
    element: nav, dispose: lifecycle.dispose,
  };

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
    return [{label: LocaleService.t("nav", "gallery"), href: "#gallery"},
      {label: LocaleService.t("nav", "reader"), href: "#reader"},
      {label: LocaleService.t("nav", "table"), href: "#table"},
      {label: LocaleService.t("nav", "stats"), href: "#statistics"}];
  }

  function render_links() {
    containers.center.replaceChildren();
    const links = create_links();
    for (const link of links) {
      const a = document.createElement('a');
      a.className = 'c-nav-bar-link';
      a.textContent = link.label;
      a.href = link.href;

      containers.center.appendChild(a);
    }
  }

  function render_menu_buttons() {
    if (local_state.has_home) {
      render_home_button()
    }
    if (local_state.has_theme) {
      render_theme_button()
    }
    if (local_state.has_locale) {
      render_locale_button()
    }
    if (local_state.has_user) {
      render_user_button()
    }
    if (local_state.has_settings) {
      render_settings_button()
    }
  }

  function render_settings_button() {
    const setting_button = create_settings_button();
    containers.right.appendChild(setting_button);
  }

  function render_home_button() {
    const home_button = create_home_button();
    containers.left.appendChild(home_button);
  }

  function render_locale_button() {
    const locale_button = create_locale_button();
    const dropdown_menu = new CDropdownMenu(locale_button);

    for (const key of Object.keys(LocaleService.STRINGS)) {
      dropdown_menu.add_menu_button(key, () => {
        app_store.setState({locale: key})
      });
    }
    containers.right.appendChild(dropdown_menu.element);
  }

  // TODO: Breakout
  function render_theme_button() {
    const theme_button = create_theme_button();
    const dropdown_menu = new CDropdownMenu(theme_button);

    // Add Default Theme Dropdown Button
    dropdown_menu.add_menu_button('Default', () => {
      app_store.setState({
        theme: ThemeService.THEME.DEFAULT,
      });
    });

    // Add Dark Theme Dropdown Button
    dropdown_menu.add_menu_button('Dark Mode', () => {
      app_store.setState({
        theme: ThemeService.THEME.DARK,
      });
    });

    containers.right.appendChild(dropdown_menu.element);
  }

  function render_user_button() {
    const user_button = create_user_button();
    containers.right.appendChild(user_button);
  }
}
