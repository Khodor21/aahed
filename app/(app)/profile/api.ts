import { apiRequest } from "@/lib/apiClient";
import type { MonthlyReviewSummary, Student } from "@/lib/types/student";

/**
 * Client-side data-access layer — calls the real Route Handlers under
 * app/api/students/. This is what "use client" components should import;
 * Server Components should read from lib/server/studentStore.ts directly.
 */

export async function fetchStudent(studentId: string): Promise<Student> {
  return apiRequest<Student>(`/api/students/${studentId}`, {
    errorMessage: "فشل تحميل بيانات الطالب",
  });
}

export async function updateMonthlyGoal(
  studentId: string,
  selectedJuz: number[]
): Promise<MonthlyReviewSummary> {
  return apiRequest<MonthlyReviewSummary>(
    `/api/students/${studentId}/current-month`,
    {
      method: "PATCH",
      body: JSON.stringify({ selectedJuz }),
      errorMessage: "فشل تحديث هدف الشهر",
    }
  );
}

export async function logout(): Promise<void> {
  await apiRequest<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
    errorMessage: "فشل تسجيل الخروج",
  });
}
