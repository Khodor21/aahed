export interface JuzOption {
  number: number;
  label: string;
}

const ordinals = [
  "الأول",
  "الثاني",
  "الثالث",
  "الرابع",
  "الخامس",
  "السادس",
  "السابع",
  "الثامن",
  "التاسع",
  "العاشر",
  "الحادي عشر",
  "الثاني عشر",
  "الثالث عشر",
  "الرابع عشر",
  "الخامس عشر",
  "السادس عشر",
  "السابع عشر",
  "الثامن عشر",
  "التاسع عشر",
  "العشرون",
  "الحادي والعشرون",
  "الثاني والعشرون",
  "الثالث والعشرون",
  "الرابع والعشرون",
  "الخامس والعشرون",
  "السادس والعشرون",
  "السابع والعشرون",
  "الثامن والعشرون",
  "التاسع والعشرون",
  "الثلاثون",
];

export const JUZ_LIST: JuzOption[] = ordinals.map((ordinal, index) => ({
  number: index + 1,
  label: `الجزء ${ordinal}`,
}));

export const PAGES_PER_JUZ = 20;

export function formatSelectedJuzLabel(selectedJuz: number[]): string {
  return [...selectedJuz]
    .sort((a, b) => a - b)
    .map((number) => JUZ_LIST.find((juz) => juz.number === number)?.label)
    .filter((label): label is string => Boolean(label))
    .join("، ");
}
