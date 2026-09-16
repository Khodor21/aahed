export interface DayPlan {
  day: number;
  startPage: number | null;
  endPage: number | null;
  pages: number;
}

/** Days in `month` (1-indexed, e.g. 9 = September) of `year`. */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Spreads `totalPages` pages across `daysInMonth` calendar days as evenly as
 * possible, in chronological page order. A day with 0 pages is a rest day.
 */
export function buildDailyPlan(
  totalPages: number,
  daysInMonth: number
): DayPlan[] {
  const pagesPerDay = new Array(daysInMonth).fill(0);

  if (totalPages > 0 && daysInMonth > 0) {
    const basePages = Math.floor(totalPages / daysInMonth);
    const remainder = totalPages % daysInMonth;

    if (basePages > 0) {
      for (let i = 0; i < daysInMonth; i++) pagesPerDay[i] = basePages;
      for (let i = 0; i < remainder; i++) {
        const idx = Math.min(
          daysInMonth - 1,
          Math.round(((i + 0.5) * daysInMonth) / remainder)
        );
        pagesPerDay[idx] += 1;
      }
    } else {
      for (let i = 0; i < totalPages; i++) {
        const idx = Math.min(
          daysInMonth - 1,
          Math.round(((i + 0.5) * daysInMonth) / totalPages)
        );
        pagesPerDay[idx] += 1;
      }
    }
  }

  let cursor = 1;
  return pagesPerDay.map((pages, index) => {
    if (pages === 0) {
      return { day: index + 1, startPage: null, endPage: null, pages: 0 };
    }
    const startPage = cursor;
    const endPage = cursor + pages - 1;
    cursor += pages;
    return { day: index + 1, startPage, endPage, pages };
  });
}

export function calculateCompletedPages(
  plan: DayPlan[],
  completedDays: number[]
): number {
  const completedSet = new Set(completedDays);
  return plan.reduce(
    (sum, day) => (completedSet.has(day.day) ? sum + day.pages : sum),
    0
  );
}
