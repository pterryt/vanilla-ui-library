export const ThemeService = {

  THEME: {
    DEFAULT: 'default', DARK: 'dark'
  },

  initialize(store) {
    this.set_theme(store.getState().theme);

    return store.subscribe(
        s => s.theme,
        theme => this.set_theme(theme)
    );
  },

  set_theme(theme) {
    if (theme === this.THEME.default) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.dataset.theme = theme;
    }
  }
}