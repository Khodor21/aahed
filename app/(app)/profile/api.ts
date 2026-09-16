import type { MonthlyReviewSummary } from "@/lib/types/student";

/**
 * Client-side data-access layer — calls the real Route Handlers under
 * app/api/students/. This is what "use client" components should import;
 * Server Components should read from lib/server/studentStore.ts directly.
 */

export async function updateMonthlyGoal(
  studentId: string,
  selectedJuz: number[]
): Promise<MonthlyReviewSummary> {
  const response = await fetch(`/api/students/${studentId}/current-month`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ selectedJuz }),
  });

  if (!response.ok) {
    throw new Error("فشل تحديث هدف الشهر");
  }

  return response.json();
}
