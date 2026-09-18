import Link from "next/link";
import { FiChevronLeft, FiMapPin } from "react-icons/fi";
import {
  attendanceIcons,
  attendanceStatusLabels,
  eventTypeIcons,
  eventTypeLabels,
  isKeyEventType,
} from "../eventMeta";
import type { EventView } from "../format";

interface EventCardProps {
  event: EventView;
  /** The nearest upcoming event gets the prominent treatment. */
  featured?: boolean;
  /** Drives the staggered entrance animation. */
  index?: number;
}

export default function EventCard({
  event,
  featured = false,
  index = 0,
}: EventCardProps) {
  const {
    id,
    type,
    title,
    dayLabel,
    clockLabel,
    countdownLabel,
    locationName,
    attendanceStatus,
    cancelled,
    past,
    ongoing,
    needsResponse,
  } = event;

  const Icon = eventTypeIcons[type];
  const AttendanceIcon = attendanceStatus
    ? attendanceIcons[attendanceStatus]
    : null;

  const cardClasses = featured
    ? "border-main/40 bg-main/5 p-4 gap-3 hover:border-main/60"
    : `border-lightgrey bg-white p-3 gap-2.5 hover:border-main/30 ${
        past ? "opacity-70" : ""
      }`;

  const iconClasses = featured
    ? "w-11 h-11 bg-main text-white"
    : past
      ? "w-10 h-10 bg-lightgrey text-black/50"
      : isKeyEventType(type)
        ? "w-10 h-10 bg-main/10 text-main"
        : "w-10 h-10 bg-lightgrey text-black";

  return (
    <Link
      href={`/events/${id}`}
      style={{ animationDelay: `${index * 45}ms` }}
      className={`animate-fade-slide-up w-full flex flex-col border rounded-md text-right transition-all duration-200 active:scale-[0.98] ${cardClasses}`}
    >
      {featured && (
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-normal text-main">
            <span className="w-1.5 h-1.5 rounded-full bg-main" />
            أقرب فعالية
          </span>
          <span className="text-[11px] font-normal text-main bg-white border border-main/30 rounded-md px-2 py-0.5">
            {countdownLabel}
          </span>
        </div>
      )}

      <div className="flex items-start gap-3">
        <span
          className={`shrink-0 rounded-full flex items-center justify-center transition-colors duration-200 ${iconClasses}`}
        >
          <Icon size={featured ? 20 : 17} />
        </span>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <span
            className={`font-normal text-black ${
              featured ? "text-base" : "text-sm"
            } ${cancelled ? "line-through decoration-black/40" : ""}`}
          >
            {title}
          </span>

          <span className="text-xs font-light text-black">
            {dayLabel} · {clockLabel}
          </span>

          {locationName && (
            <span className="flex items-center gap-1 text-[11px] font-light text-black/60 truncate">
              <FiMapPin size={11} className="shrink-0" />
              {locationName}
            </span>
          )}
        </div>
      </div>

      <div
        className={`flex items-center flex-wrap gap-2 ${
          featured ? "border-t border-main/20 pt-2.5" : ""
        }`}
      >
        <span className="text-[11px] font-light text-black bg-lightgrey rounded-md px-2 py-0.5">
          {eventTypeLabels[type]}
        </span>

        {cancelled ? (
          <span className="text-[11px] font-normal text-main">ملغاة</span>
        ) : ongoing ? (
          <span className="text-[11px] font-normal text-main">جارية الآن</span>
        ) : needsResponse ? (
          <span className="text-[11px] font-normal text-main">
            بانتظار ردك
          </span>
        ) : attendanceStatus && AttendanceIcon ? (
          <span
            className={`flex items-center gap-1 text-[11px] font-light ${
              attendanceStatus === "going" ? "text-main" : "text-black/60"
            }`}
          >
            <AttendanceIcon size={11} className="shrink-0" />
            {attendanceStatusLabels[attendanceStatus]}
          </span>
        ) : null}

        {!featured && !cancelled && !past && (
          <span className="text-[11px] font-light text-black/60">
            {countdownLabel}
          </span>
        )}

        <FiChevronLeft size={14} className="text-black/40 ms-auto shrink-0" />
      </div>
    </Link>
  );
}
