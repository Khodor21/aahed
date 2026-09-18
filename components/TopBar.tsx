"use client";

import Link from "next/link";
import { FiBell, FiChevronRight } from "react-icons/fi";
import { useNotifications } from "./NotificationsProvider";

interface TopBarProps {
  title: string;
  showNotificationsLink?: boolean;
  /** Shows a back arrow before the title, for pages opened from a list. */
  backHref?: string;
}

export default function TopBar({
  title,
  showNotificationsLink = true,
  backHref,
}: TopBarProps) {
  const { unreadCount } = useNotifications();

  return (
    <div className="sticky top-0 z-10 bg-white flex items-center justify-between w-full py-2">
      <div className="flex items-center gap-1 min-w-0">
        {backHref && (
          <Link
            href={backHref}
            aria-label="رجوع"
            className="text-black -ms-1 shrink-0"
          >
            <FiChevronRight size={22} />
          </Link>
        )}
        <h1
          className="text-lg font-normal text-black truncate"
          style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
        >
          {title}
        </h1>
      </div>
      {showNotificationsLink ? (
        <Link
          href="/notifications"
          className="relative text-black"
          aria-label={
            unreadCount > 0
              ? `الإشعارات، ${unreadCount} غير مقروء`
              : "الإشعارات"
          }
        >
          <FiBell size={20} />
          {unreadCount > 0 && (
            <span
              dir="ltr"
              className="absolute -top-1.5 -inset-e-1.5 min-w-4 h-4 px-1 rounded-full bg-main text-white text-[10px] leading-none font-normal flex items-center justify-center ring-2 ring-white"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>
      ) : (
        <span className="w-5" />
      )}
    </div>
  );
}
