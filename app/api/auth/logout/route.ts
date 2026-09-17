import { NextResponse } from "next/server";

/**
 * Stub until real auth/session handling exists. Once it does, this should
 * invalidate the session / clear the auth cookie server-side.
 */
export async function POST() {
  return NextResponse.json({ success: true });
}
