import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FiAward,
  FiCalendar,
  FiChevronLeft,
  FiInfo,
  FiTarget,
} from "react-icons/fi";
import type { AppNotification, NotificationType } from "@/lib/types/notification";

const typeIcons: Record<NotificationType, IconType> = {
  reminder: FiTarget,
  evaluation: FiAward,
  event: FiCalendar,
  announcement: FiInfo,
};

const typeLabels: Record<NotificationType, string> = {
  reminder: "تذكير",
  evaluation: "تقييم",
  event: "فعالية",
  announcement: "إعلان",
};

const isPersonal = (type: NotificationType) =>
  type === "reminder" || type === "evaluation";

interface NotificationItemProps {
  notification: AppNotification;
  timeLabel: string;
}

export default function NotificationItem({
  notification,
  timeLabel,
}: NotificationItemProps) {
  const { type, title, body, read, href } = notification;
  const Icon = typeIcons[type];

  const cardClasses = `flex items-start gap-3 w-full border rounded-md p-3 text-right transition-all duration-200 ${
    read ? "border-lightgrey bg-white" : "border-main/30 bg-main/5"
  } ${href ? "hover:border-main/40 active:scale-[0.98]" : ""}`;

  const content = (
    <>
      <span
        className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${
          isPersonal(type) ? "bg-main/10 text-main" : "bg-lightgrey text-black"
        }`}
      >
        <Icon size={16} />
      </span>

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="flex-1 text-sm font-normal text-black">{title}</span>
          {read ? null : (
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-main" />
          )}
        </div>

        <p className="text-xs font-light text-black leading-relaxed">{body}</p>

        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-[11px] font-light text-black bg-lightgrey rounded-md px-2 py-0.5">
            {typeLabels[type]}
          </span>
          <span className="text-[11px] font-light text-black/60">
            {timeLabel}
          </span>
          {href ? (
            <FiChevronLeft size={14} className="text-black/40 ms-auto" />
          ) : null}
        </div>
      </div>
    </>
  );

  if (!href) {
    return <div className={cardClasses}>{content}</div>;
  }

  return (
    <Link href={href} className={cardClasses}>
      {content}
    </Link>
  );
}
