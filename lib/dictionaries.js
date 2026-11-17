const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export const locales = Object.keys(dictionaries);

export const getDictionary = (lang) => dictionaries[lang]();
