import { apiRequest } from "@/lib/apiClient";
import type { AppEvent, AttendanceStatus } from "@/lib/types/event";

/**
 * Client-side data-access layer — calls the real Route Handlers under
 * app/api/events/. This is what "use client" components should import;
 * Server Components read from lib/server/eventStore.ts directly.
 *
 * Events are a shared resource, so they live at /api/events. `studentId` is
 * passed only to resolve the caller's own attendance, and goes away once real
 * auth can take it from the session.
 */

/** Oldest first, matching the store's order. */
export async function fetchEvents(studentId: string): Promise<AppEvent[]> {
  return apiRequest<AppEvent[]>(
    `/api/events?studentId=${encodeURIComponent(studentId)}`,
    { errorMessage: "فشل تحميل الفعاليات" }
  );
}

export async function fetchEvent(
  studentId: string,
  eventId: string
): Promise<AppEvent> {
  return apiRequest<AppEvent>(
    `/api/events/${eventId}?studentId=${encodeURIComponent(studentId)}`,
    { errorMessage: "فشل تحميل تفاصيل الفعالية" }
  );
}

export async function saveAttendance(
  studentId: string,
  eventId: string,
  status: AttendanceStatus,
  note?: string
): Promise<AppEvent> {
  return apiRequest<AppEvent>(`/api/events/${eventId}/attendance`, {
    method: "PATCH",
    body: JSON.stringify({ studentId, status, note }),
    errorMessage: "فشل تحديث حالة الحضور",
  });
}
