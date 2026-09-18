import { NextResponse } from "next/server";
import { setAttendance } from "@/lib/server/eventStore";
import type { AttendanceStatus } from "@/lib/types/event";

const allowedStatuses: AttendanceStatus[] = ["going", "maybe", "not_going"];

const isAttendanceStatus = (value: unknown): value is AttendanceStatus =>
  typeof value === "string" &&
  allowedStatuses.includes(value as AttendanceStatus);

/**
 * The one per-student part of an event. `studentId` travels in the body until
 * real auth can take it from the session.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const studentId: unknown = body?.studentId;
  const status: unknown = body?.status;
  const note: unknown = body?.note;

  if (typeof studentId !== "string" || !studentId) {
    return NextResponse.json({ error: "studentId مطلوب" }, { status: 400 });
  }

  if (!isAttendanceStatus(status)) {
    return NextResponse.json(
      { error: "status يجب أن يكون going أو maybe أو not_going" },
      { status: 400 }
    );
  }

  if (note !== undefined && typeof note !== "string") {
    return NextResponse.json(
      { error: "note يجب أن يكون نصاً" },
      { status: 400 }
    );
  }

  const updated = await setAttendance(studentId, id, status, note);

  if (!updated) {
    return NextResponse.json(
      { error: "الفعالية غير موجودة" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}
