import { NextResponse } from "next/server";
import { getStudentById } from "@/lib/server/studentStore";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    return NextResponse.json({ error: "الطالب غير موجود" }, { status: 404 });
  }

  return NextResponse.json(student);
}
