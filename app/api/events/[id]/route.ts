import { NextResponse } from "next/server";
import { getEventById } from "@/lib/server/eventStore";

/** `studentId` is only used to merge in that student's attendance answer. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const studentId = new URL(request.url).searchParams.get("studentId");

  if (!studentId) {
    return NextResponse.json({ error: "studentId مطلوب" }, { status: 400 });
  }

  const event = await getEventById(studentId, id);

  if (!event) {
    return NextResponse.json({ error: "الفعالية غير موجودة" }, { status: 404 });
  }

  return NextResponse.json(event);
}
