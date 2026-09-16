import { NextResponse } from "next/server";
import { toggleDayCompletion } from "@/lib/server/studentStore";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const day: unknown = body?.day;
  const completed: unknown = body?.completed;

  if (typeof day !== "number" || typeof completed !== "boolean") {
    return NextResponse.json(
      { error: "day يجب أن يكون رقماً و completed يجب أن يكون قيمة منطقية" },
      { status: 400 }
    );
  }

  const updated = await toggleDayCompletion(id, day, completed);

  if (!updated) {
    return NextResponse.json(
      { error: "الطالب غير موجود أو لا يوجد هدف لهذا الشهر" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}
