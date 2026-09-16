import type { AppNotification } from "@/lib/types/notification";

const timeFormatter = new Intl.DateTimeFormat("ar-u-nu-latn", {
  hour: "numeric",
  minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat("ar-u-nu-latn", {
  day: "numeric",
  month: "long",
});

export interface NotificationGroup {
  label: string;
  items: AppNotification[];
}

const DAY_MS = 24 * 60 * 60 * 1000;

function daysBetween(now: Date, date: Date): number {
  const startOfNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return Math.round((startOfNow.getTime() - startOfDate.getTime()) / DAY_MS);
}

/** Clock time for the last two days, a short date before that. */
export function formatNotificationTime(createdAt: string, now: Date): string {
  const date = new Date(createdAt);
  return daysBetween(now, date) <= 1
    ? timeFormatter.format(date)
    : dateFormatter.format(date);
}

/** Expects `notifications` sorted newest first. */
export function groupNotificationsByDay(
  notifications: AppNotification[],
  now: Date
): NotificationGroup[] {
  const groups: NotificationGroup[] = [];

  for (const notification of notifications) {
    const days = daysBetween(now, new Date(notification.createdAt));
    const label = days === 0 ? "اليوم" : days === 1 ? "أمس" : "سابقاً";
    const currentGroup = groups[groups.length - 1];

    if (currentGroup?.label === label) {
      currentGroup.items.push(notification);
    } else {
      groups.push({ label, items: [notification] });
    }
  }

  return groups;
}

export function formatUnreadLabel(count: number): string {
  if (count === 1) return "لديك إشعار جديد";
  if (count === 2) return "لديك إشعاران جديدان";
  if (count <= 10) return `لديك ${count} إشعارات جديدة`;
  return `لديك ${count} إشعاراً جديداً`;
}
