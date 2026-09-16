import type { MonthlyReviewSummary, Student } from "@/lib/types/student";
import { PAGES_PER_JUZ } from "@/lib/juz";
import { buildDailyPlan, calculateCompletedPages, getDaysInMonth } from "@/lib/dailyPlan";

/**
 * In-memory data store standing in for a real database.
 * Only import this from Route Handlers (app/api/**) or Server Components —
 * never from a "use client" file. Replace with real DB calls when the
 * backend exists; callers (the route handlers) don't need to change.
 */

const seedStudent: Student = {
  id: "std-1",
  name: "أسامة نعمان",
  role: "عميد",
  avatarInitials: "أن",
  currentMonth: {
    id: "2026-09",
    monthLabel: "سبتمبر 2026",
    selectedJuz: [5],
    targetPages: 20,
    completedPages: 8,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    status: "on_track",
  },
  streakDays: 5,
  totalJuzReviewed: 6,
  averageScore: 8.4,
  achievements: [
    { id: "a1", label: "أول مراجعة كاملة", icon: "award" },
    { id: "a2", label: "3 أشهر متتالية", icon: "award" },
  ],
  history: [
    {
      id: "2026-08",
      monthLabel: "أغسطس 2026",
      selectedJuz: [4],
      targetPages: 20,
      completedPages: 20,
      completedDays: [],
      status: "completed",
      evaluation: {
        score: 9,
        notes: "أداء ممتاز في التسميع، الحفظ متقن والترتيل جيد جداً.",
        teacherName: "الشيخ عبدالله",
        date: "2026-08-28",
      },
    },
    {
      id: "2026-07",
      monthLabel: "يوليو 2026",
      selectedJuz: [3],
      targetPages: 20,
      completedPages: 20,
      completedDays: [],
      status: "completed",
      evaluation: {
        score: 8,
        notes: "مراجعة جيدة، يحتاج إلى تحسين تثبيت أواخر الصفحات.",
        teacherName: "الشيخ عبدالله",
        date: "2026-07-30",
      },
    },
    {
      id: "2026-06",
      monthLabel: "يونيو 2026",
      selectedJuz: [2],
      targetPages: 20,
      completedPages: 14,
      completedDays: [],
      status: "behind",
      evaluation: {
        score: 7,
        notes: "الجزء لم يكتمل بالكامل، يُنصح بتوزيع الورد اليومي بشكل أثبت.",
        teacherName: "الشيخ عبدالله",
        date: "2026-06-29",
      },
    },
  ],
};

const store = new Map<string, Student>([[seedStudent.id, seedStudent]]);

export async function getStudentById(id: string): Promise<Student | undefined> {
  return store.get(id);
}

function createEmptyMonth(): MonthlyReviewSummary {
  const now = new Date();
  return {
    id: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
    monthLabel: new Intl.DateTimeFormat("ar-u-nu-latn", {
      month: "long",
      year: "numeric",
    }).format(now),
    selectedJuz: [],
    targetPages: 0,
    completedPages: 0,
    completedDays: [],
    status: "not_started",
  };
}

export async function updateCurrentMonth(
  studentId: string,
  selectedJuz: number[]
): Promise<MonthlyReviewSummary | undefined> {
  const student = store.get(studentId);
  if (!student) return undefined;

  const base = student.currentMonth ?? createEmptyMonth();
  const targetPages = selectedJuz.length * PAGES_PER_JUZ;

  // Changing the selected Juz' changes what "progress" even means, so any
  // prior daily completion no longer applies — start the month over.
  const updated: MonthlyReviewSummary = {
    ...base,
    selectedJuz,
    targetPages,
    completedPages: 0,
    completedDays: [],
    status: targetPages === 0 ? "not_started" : "on_track",
  };

  store.set(studentId, { ...student, currentMonth: updated });
  return updated;
}

function parseYearMonth(id: string): [number, number] {
  const [year, month] = id.split("-").map(Number);
  return [year, month];
}

export async function toggleDayCompletion(
  studentId: string,
  day: number,
  completed: boolean
): Promise<MonthlyReviewSummary | undefined> {
  const student = store.get(studentId);
  if (!student || !student.currentMonth) return undefined;

  const current = student.currentMonth;
  const completedDays = completed
    ? Array.from(new Set([...current.completedDays, day]))
    : current.completedDays.filter((d) => d !== day);

  const [year, month] = parseYearMonth(current.id);
  const daysInMonth = getDaysInMonth(year, month);
  const plan = buildDailyPlan(current.targetPages, daysInMonth);
  const completedPages = calculateCompletedPages(plan, completedDays);

  const updated: MonthlyReviewSummary = {
    ...current,
    completedDays,
    completedPages,
    status:
      current.targetPages === 0
        ? "not_started"
        : completedPages >= current.targetPages
          ? "completed"
          : "on_track",
  };

  store.set(studentId, { ...student, currentMonth: updated });
  return updated;
}
