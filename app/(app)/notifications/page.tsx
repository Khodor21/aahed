import { FiBell } from "react-icons/fi";
import TopBar from "@/components/TopBar";
import { getNotifications } from "@/lib/server/notificationStore";
import MarkAllRead from "./components/MarkAllRead";
import NotificationItem from "./components/NotificationItem";
import {
  formatNotificationTime,
  formatUnreadLabel,
  groupNotificationsByDay,
} from "./format";

const STUDENT_ID = "std-1";

export default async function NotificationsPage() {
  const notifications = await getNotifications(STUDENT_ID);
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const now = new Date();
  const groups = groupNotificationsByDay(notifications, now);

  return (
    <main className="min-h-screen flex flex-col items-center pt-10 pb-24" dir="rtl">
      <div className="w-full max-w-sm px-4 mx-auto flex flex-col space-y-6">
        <TopBar title="الإشعارات" showNotificationsLink={false} />

        <MarkAllRead studentId={STUDENT_ID} hasUnread={unreadCount > 0} />

        {notifications.length === 0 ? (
          <div className="w-full flex flex-col items-center text-center space-y-3 py-10">
            <FiBell size={40} className="text-lightgrey" />
            <span className="text-sm font-normal text-black">
              لا توجد إشعارات بعد
            </span>
            <span className="text-xs font-light text-black leading-relaxed">
              ستصلك هنا تذكيرات هدفك اليومي، وتنبيهات مواعيد التسميع، وأي
              إعلانات عامة من المشرفين.
            </span>
          </div>
        ) : (
          <div className="w-full flex flex-col space-y-5">
            {unreadCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-main" />
                <span className="text-xs font-normal text-main">
                  {formatUnreadLabel(unreadCount)}
                </span>
              </div>
            )}

            {groups.map((group) => (
              <div key={group.label} className="w-full flex flex-col space-y-2">
                <h2 className="text-xs font-light text-black/60">
                  {group.label}
                </h2>
                {group.items.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    timeLabel={formatNotificationTime(
                      notification.createdAt,
                      now
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
