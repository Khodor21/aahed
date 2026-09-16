"use client";

import { useEffect } from "react";
import { useNotifications } from "@/components/NotificationsProvider";
import { markNotificationsAsRead } from "../actions";

interface MarkAllReadProps {
  studentId: string;
  hasUnread: boolean;
}

/**
 * Clears the bell counter as soon as the list is on screen. The items keep
 * their "new" styling for this visit so the student can still tell them apart.
 */
export default function MarkAllRead({ studentId, hasUnread }: MarkAllReadProps) {
  const { clearUnread } = useNotifications();

  useEffect(() => {
    if (!hasUnread) return;

    clearUnread();
    markNotificationsAsRead(studentId).catch(() => {
      // request failed — the counter comes back on the next load
    });
  }, [studentId, hasUnread, clearUnread]);

  return null;
}
