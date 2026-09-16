"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface NotificationsContextValue {
  unreadCount: number;
  clearUnread: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue>({
  unreadCount: 0,
  clearUnread: () => {},
});

export function useNotifications() {
  return useContext(NotificationsContext);
}

interface NotificationsProviderProps {
  initialUnreadCount: number;
  children: React.ReactNode;
}

export default function NotificationsProvider({
  initialUnreadCount,
  children,
}: NotificationsProviderProps) {
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const clearUnread = useCallback(() => setUnreadCount(0), []);

  return (
    <NotificationsContext.Provider value={{ unreadCount, clearUnread }}>
      {children}
    </NotificationsContext.Provider>
  );
}
