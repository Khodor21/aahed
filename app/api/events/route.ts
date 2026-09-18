import { NextResponse } from "next/server";
import { getEvents } from "@/lib/server/eventStore";

/**
 * Events are shared across all students — `studentId` only decides whose
 * attendance answer gets merged into each event. Once real auth exists it
 * comes from the session and this query param disappears.
 */
export async function GET(request: Request) {
  const studentId = new URL(request.url).searchParams.get("studentId");

  if (!studentId) {
    return NextResponse.json({ error: "studentId مطلوب" }, { status: 400 });
  }

  const events = await getEvents(studentId);

  return NextResponse.json(events);
}
