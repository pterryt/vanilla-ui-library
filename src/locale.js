import en from "@locales/en.json" with { type: "json" };
import ja from "@locales/ja.json" with { type: "json" };

export const LocaleService = {

  STRINGS: { en, ja },

  initialize(store) {
    this.store = store;
  },

  t(group, key) {
    const locale = this.store.getState().locale;

    return this.STRINGS[locale]?.[group]?.[key] ?? key;
  },

  set_locale(locale_code) {
    this.store.setState( { locale: locale_code } )
  }
};