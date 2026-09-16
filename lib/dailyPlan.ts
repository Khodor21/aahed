export type DayPlanType = "new" | "review";

export interface DayPlan {
  day: number;
  startPage: number | null;
  endPage: number | null;
  pages: number;
  /** "new" = pages studied for the first time, "review" = recite everything covered so far. */
  type: DayPlanType;
}

/** Days in `month` (1-indexed, e.g. 9 = September) of `year`. */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Builds a full-month plan with a task every day: the student studies new pages
 * in order starting on day 1, and every few days gets a review day that covers
 * everything studied so far in one sitting. The last day of the month is a
 * review of the whole portion, mirroring the end-of-month recitation session.
 */
export function buildDailyPlan(
  totalPages: number,
  daysInMonth: number
): DayPlan[] {
  if (daysInMonth <= 0) return [];
  if (totalPages <= 0) {
    return Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      startPage: null,
      endPage: null,
      pages: 0,
      type: "new" as const,
    }));
  }

  // A page a day or more leaves no room for dedicated review days.
  if (totalPages >= daysInMonth) return buildStudyOnlyPlan(totalPages, daysInMonth);

  const reviewDays = daysInMonth - totalPages;
  const basePagesPerCycle = Math.floor(totalPages / reviewDays);
  const cyclesWithExtraPage = totalPages % reviewDays;

  const plan: DayPlan[] = [];
  let cursor = 0;

  for (let cycle = 0; cycle < reviewDays; cycle++) {
    const newPages =
      basePagesPerCycle + (cycle < cyclesWithExtraPage ? 1 : 0);

    for (let i = 0; i < newPages; i++) {
      cursor += 1;
      plan.push({
        day: plan.length + 1,
        startPage: cursor,
        endPage: cursor,
        pages: 1,
        type: "new",
      });
    }

    plan.push({
      day: plan.length + 1,
      startPage: 1,
      endPage: cursor,
      pages: cursor,
      type: "review",
    });
  }

  return plan;
}

/** Spreads `totalPages` over every day of the month, in chronological order. */
function buildStudyOnlyPlan(totalPages: number, daysInMonth: number): DayPlan[] {
  const basePages = Math.floor(totalPages / daysInMonth);
  const daysWithExtraPage = totalPages % daysInMonth;

  let cursor = 1;
  return Array.from({ length: daysInMonth }, (_, index) => {
    const pages = basePages + (index < daysWithExtraPage ? 1 : 0);
    const startPage = cursor;
    const endPage = cursor + pages - 1;
    cursor += pages;
    return { day: index + 1, startPage, endPage, pages, type: "new" as const };
  });
}

/** Only new pages count towards the monthly target — review days repeat covered pages. */
export function calculateCompletedPages(
  plan: DayPlan[],
  completedDays: number[]
): number {
  const completedSet = new Set(completedDays);
  return plan.reduce(
    (sum, day) =>
      day.type === "new" && completedSet.has(day.day) ? sum + day.pages : sum,
    0
  );
}
