import type { Lang, Text } from "./types.ts";

export function t(value: Text, lang: Lang): string {
  const primary = value[lang]?.trim();
  if (primary) return primary;
  const other = lang === "en" ? value.ru : value.en;
  return other?.trim() ?? "";
}

export function mono(value: string): Text {
  return { en: value, ru: value };
}
