export const Theme = {

  THEME: {
    DEFAULT: 'default', DARK: 'dark'
  },

  set_theme(theme) {
    if (theme === Theme.THEME.default) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.dataset.theme = theme;
    }
  }
}