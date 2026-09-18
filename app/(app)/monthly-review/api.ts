import { apiRequest } from "@/lib/apiClient";
import type { MonthlyReviewSummary } from "@/lib/types/student";

/**
 * Client-side data-access layer — calls the real Route Handlers under
 * app/api/students/. This is what "use client" components should import;
 * Server Components should read from lib/server/studentStore.ts directly.
 */

/** `null` when the student hasn't set a goal for the running month yet. */
export async function fetchCurrentMonth(
  studentId: string
): Promise<MonthlyReviewSummary | null> {
  return apiRequest<MonthlyReviewSummary | null>(
    `/api/students/${studentId}/current-month`,
    { errorMessage: "فشل تحميل خطة الشهر" }
  );
}

export async function toggleDayCompletion(
  studentId: string,
  day: number,
  completed: boolean
): Promise<MonthlyReviewSummary> {
  return apiRequest<MonthlyReviewSummary>(
    `/api/students/${studentId}/current-month/days`,
    {
      method: "PATCH",
      body: JSON.stringify({ day, completed }),
      errorMessage: "فشل تحديث حالة اليوم",
    }
  );
}
