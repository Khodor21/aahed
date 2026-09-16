import type { AppNotification } from "@/lib/types/notification";

/**
 * In-memory data store standing in for a real database.
 * Only import this from Route Handlers (app/api/**) or Server Components —
 * never from a "use client" file.
 */

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

const seedNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "reminder",
    title: "ورد اليوم في انتظارك",
    body: "لم تسجّل إتمام ورد اليوم بعد. افتح خطتك الشهرية وأكمل صفحة اليوم.",
    createdAt: hoursAgo(3),
    read: false,
    href: "/monthly-review",
  },
  {
    id: "n2",
    type: "event",
    title: "جلسة التسميع الموسّعة",
    body: "حُدد موعد التسميع الشهري يوم الجمعة بعد صلاة العصر في مقر الفوج.",
    createdAt: hoursAgo(9),
    read: false,
    href: "/events",
  },
  {
    id: "n3",
    type: "announcement",
    title: "فتح باب التسجيل في رحلة الفوج",
    body: "التسجيل متاح حتى نهاية الأسبوع، والأماكن محدودة. راجع تفاصيل الرحلة في صفحة الفعاليات.",
    createdAt: hoursAgo(28),
    read: false,
    href: "/events",
  },
  {
    id: "n4",
    type: "evaluation",
    title: "وصل تقييم الشيخ عبدالله",
    body: "حصلت على 9 من 10 في تسميع شهر أغسطس. اطّلع على ملاحظات الشيخ في ملفك الشخصي.",
    createdAt: hoursAgo(4 * 24),
    read: true,
    href: "/profile",
  },
  {
    id: "n5",
    type: "reminder",
    title: "أتممت أسبوعك الأول كاملاً",
    body: "واصل على هذا المستوى، فتقدمك هذا الشهر سائر على المسار الصحيح.",
    createdAt: hoursAgo(7 * 24),
    read: true,
  },
];

const store = new Map<string, AppNotification[]>([["std-1", seedNotifications]]);

/** Newest first. */
export async function getNotifications(
  studentId: string
): Promise<AppNotification[]> {
  const notifications = store.get(studentId) ?? [];
  return [...notifications].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
}

export async function getUnreadCount(studentId: string): Promise<number> {
  const notifications = store.get(studentId) ?? [];
  return notifications.filter((notification) => !notification.read).length;
}

export async function markAllAsRead(
  studentId: string
): Promise<AppNotification[] | undefined> {
  const notifications = store.get(studentId);
  if (!notifications) return undefined;

  const updated = notifications.map((notification) =>
    notification.read ? notification : { ...notification, read: true }
  );
  store.set(studentId, updated);
  return updated;
}
