export const locale = {
  STRINGS: {
    en: {
      nav: {
        gallery: "Gallery",
        reader: "Reader",
        table: "Table",
        stats: "Statistics",
        settings: "Settings",
        theme: "Theme",
        user: "User"
      }
    },

    ja: {
      nav: {
        gallery: "ギャラリー",
        reader: "リーダー",
        table: "テーブル",
        stats: "統計",
        settings: "設定",
        theme: "テーマ",
        user: "ユーザー"
      }
    }
  },

  /**
   * Function that, given a locale code, returns a function that handles
   * getting localized strings.
   * @param locale_code
   * @returns {function(*, *): *}
   */
  get_locale(locale_code) {
    return function l(string_group, string_key) {
      return locale.STRINGS[locale_code]?.[string_group]?.[string_key] ?? string_key;
    }
  }

};