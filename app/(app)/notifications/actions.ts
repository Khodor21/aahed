"use server";

import { markAllAsRead } from "@/lib/server/notificationStore";

export async function markNotificationsAsRead(studentId: string) {
  await markAllAsRead(studentId);
}
