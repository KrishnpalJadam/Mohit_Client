// ** Next, React And Locals Imports
import "server-only";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  ar: () => import("./ar.json").then((module) => module.default),
  de: () => import("./de.json").then((module) => module.default),
  jp: () => import("./jp.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
