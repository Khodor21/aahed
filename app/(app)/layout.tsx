import BottomNav from "@/components/BottomNav";
import NotificationsProvider from "@/components/NotificationsProvider";
import { getUnreadCount } from "@/lib/server/notificationStore";

// The bell counter is per-student state, so the shell can't be prerendered.
export const dynamic = "force-dynamic";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const unreadCount = await getUnreadCount("std-1");

  return (
    <NotificationsProvider initialUnreadCount={unreadCount}>
      {children}
      <BottomNav />
    </NotificationsProvider>
  );
}
