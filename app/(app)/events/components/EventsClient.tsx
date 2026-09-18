"use client";

import { useState } from "react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FiCalendar, FiChevronLeft, FiClock, FiUserCheck } from "react-icons/fi";
import type { EventGroup, EventView } from "../format";
import { formatPendingResponsesLabel } from "../format";
import EventCard from "./EventCard";

type Tab = "upcoming" | "past";

interface EventsClientProps {
  upcomingGroups: EventGroup[];
  pastEvents: EventView[];
  /** Nearest upcoming event — rendered as the featured card. */
  featuredId: string | null;
  /** Upcoming events the student hasn't answered yet, nearest first. */
  pendingResponses: EventView[];
}

export default function EventsClient({
  upcomingGroups,
  pastEvents,
  featuredId,
  pendingResponses,
}: EventsClientProps) {
  const [tab, setTab] = useState<Tab>("upcoming");

  const upcomingCount = upcomingGroups.reduce(
    (sum, group) => sum + group.items.length,
    0
  );

  // Cards before each group, so the entrance stagger runs across day groups.
  const groupOffsets = upcomingGroups.map((_, index) =>
    upcomingGroups
      .slice(0, index)
      .reduce((sum, group) => sum + group.items.length, 0)
  );

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "upcoming", label: "القادمة", count: upcomingCount },
    { key: "past", label: "السابقة", count: pastEvents.length },
  ];

  return (
    <div className="w-full flex flex-col space-y-5">
      {/* Upcoming / past switch */}
      <div className="w-full bg-lightgrey rounded-md p-1 flex items-center gap-1">
        {tabs.map((item) => {
          const active = tab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              aria-pressed={active}
              className={`flex-1 rounded-md py-1.5 text-xs transition-all duration-200 ${
                active
                  ? "bg-white text-black font-normal shadow-sm"
                  : "text-black/60 font-light"
              }`}
            >
              {item.label}
              {item.count > 0 ? ` (${item.count})` : ""}
            </button>
          );
        })}
      </div>

      {tab === "upcoming" ? (
        upcomingCount === 0 ? (
          <EmptyState
            icon={FiCalendar}
            title="لا توجد فعاليات قادمة بعد"
            body="هنا ستجد مواعيد جلسات المراجعة الكبرى، والرحلات، والأنشطة الكشفية، مع كل التفاصيل التي تحتاجها للمشاركة."
          />
        ) : (
          <>
            {pendingResponses.length > 0 && <PendingNudge events={pendingResponses} />}

            {upcomingGroups.map((group, groupIndex) => (
              <div key={group.label} className="w-full flex flex-col space-y-2">
                <h2 className="text-xs font-light text-black/60">
                  {group.label}
                </h2>
                {group.items.map((event, itemIndex) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    featured={event.id === featuredId}
                    index={groupOffsets[groupIndex] + itemIndex}
                  />
                ))}
              </div>
            ))}
          </>
        )
      ) : pastEvents.length === 0 ? (
        <EmptyState
          icon={FiClock}
          title="لا يوجد سجل فعاليات بعد"
          body="بعد مشاركتك في أول فعالية ستظهر هنا، لتتابع سجل حضورك وجلسات التسميع السابقة."
        />
      ) : (
        <div className="w-full flex flex-col space-y-2">
          {pastEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Nudges the student to answer before the organizers need the numbers. */
function PendingNudge({ events }: { events: EventView[] }) {
  const single = events.length === 1;
  const content = (
    <>
      <span className="w-9 h-9 shrink-0 rounded-full bg-main/10 text-main flex items-center justify-center">
        <FiUserCheck size={16} />
      </span>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-sm font-normal text-black">
          {single ? "لم تؤكد حضورك بعد" : formatPendingResponsesLabel(events.length)}
        </span>
        <span className="text-xs font-light text-black leading-relaxed">
          {single
            ? `حدد حضورك في «${events[0].title}» ليعرف المشرفون العدد.`
            : "افتح كل فعالية وحدد حضورك ليعرف المشرفون العدد."}
        </span>
      </div>
      {single && (
        <FiChevronLeft size={14} className="text-black/40 shrink-0 self-center" />
      )}
    </>
  );

  const classes =
    "flex items-start gap-3 w-full border border-main/30 bg-main/5 rounded-md p-3 text-right";

  if (!single) return <div className={classes}>{content}</div>;

  return (
    <Link
      href={`/events/${events[0].id}`}
      className={`${classes} transition-all duration-200 hover:border-main/50 active:scale-[0.98]`}
    >
      {content}
    </Link>
  );
}

interface EmptyStateProps {
  icon: IconType;
  title: string;
  body: string;
}

function EmptyState({ icon: Icon, title, body }: EmptyStateProps) {
  return (
    <div className="w-full flex flex-col items-center text-center space-y-3 py-10">
      <Icon size={40} className="text-lightgrey" />
      <span className="text-sm font-normal text-black">{title}</span>
      <span className="text-xs font-light text-black leading-relaxed">
        {body}
      </span>
    </div>
  );
}
