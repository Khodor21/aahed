import { NextResponse } from "next/server";
import { updateCurrentMonth } from "@/lib/server/studentStore";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const selectedJuz: unknown = body?.selectedJuz;

  if (
    !Array.isArray(selectedJuz) ||
    !selectedJuz.every((value) => typeof value === "number")
  ) {
    return NextResponse.json(
      { error: "selectedJuz يجب أن يكون مصفوفة أرقام" },
      { status: 400 }
    );
  }

  const updated = await updateCurrentMonth(id, selectedJuz);

  if (!updated) {
    return NextResponse.json({ error: "الطالب غير موجود" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
