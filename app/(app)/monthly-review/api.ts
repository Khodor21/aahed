import type { MonthlyReviewSummary } from "@/lib/types/student";

export async function toggleDayCompletion(
  studentId: string,
  day: number,
  completed: boolean
): Promise<MonthlyReviewSummary> {
  const response = await fetch(`/api/students/${studentId}/current-month/days`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ day, completed }),
  });

  if (!response.ok) {
    throw new Error("فشل تحديث حالة اليوم");
  }

  return response.json();
}
