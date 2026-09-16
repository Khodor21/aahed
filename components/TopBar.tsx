import Link from "next/link";
import { FiBell } from "react-icons/fi";

interface TopBarProps {
  title: string;
  showNotificationsLink?: boolean;
  hasUnreadNotifications?: boolean;
}

export default function TopBar({
  title,
  showNotificationsLink = true,
  hasUnreadNotifications = false,
}: TopBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-white flex items-center justify-between w-full py-2">
      <h1
        className="text-lg font-normal text-black"
        style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
      >
        {title}
      </h1>
      {showNotificationsLink ? (
        <Link href="/notifications" className="relative text-black">
          <FiBell size={20} />
          {hasUnreadNotifications && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-main" />
          )}
        </Link>
      ) : (
        <span className="w-5" />
      )}
    </div>
  );
}
