import type { AppEvent, AttendanceStatus, EventType } from "@/lib/types/event";

const clockFormatter = new Intl.DateTimeFormat("ar-u-nu-latn", {
  hour: "numeric",
  minute: "2-digit",
});

const dayMonthFormatter = new Intl.DateTimeFormat("ar-u-nu-latn", {
  day: "numeric",
  month: "long",
});

const weekdayFormatter = new Intl.DateTimeFormat("ar", { weekday: "long" });

const fullDateFormatter = new Intl.DateTimeFormat("ar-u-nu-latn", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

/** Whole days from now's day to `date`'s day: 0 today, 1 tomorrow, -1 yesterday. */
function dayOffset(now: Date, date: Date): number {
  return Math.round((startOfDay(date) - startOfDay(now)) / DAY_MS);
}

/** Falls back to the start time for events with no known end. */
export function getEventEnd(event: AppEvent): Date {
  return new Date(event.endAt ?? event.startAt);
}

export function isPastEvent(event: AppEvent, now: Date): boolean {
  return getEventEnd(event).getTime() < now.getTime();
}

export function isOngoingEvent(event: AppEvent, now: Date): boolean {
  const start = new Date(event.startAt).getTime();
  return start <= now.getTime() && now.getTime() <= getEventEnd(event).getTime();
}

/** Short, mostly relative day label for cards. */
export function formatEventDay(startAt: string, now: Date): string {
  const date = new Date(startAt);
  const offset = dayOffset(now, date);

  if (offset === 0) return "اليوم";
  if (offset === 1) return "غداً";
  if (offset === 2) return "بعد غد";
  if (offset === -1) return "أمس";
  if (offset > 2 && offset <= 6) {
    return `${weekdayFormatter.format(date)} ${dayMonthFormatter.format(date)}`;
  }
  return dayMonthFormatter.format(date);
}

/** Full weekday + date, for the details page. */
export function formatEventFullDate(startAt: string): string {
  return fullDateFormatter.format(new Date(startAt));
}

export function formatEventClock(startAt: string): string {
  return clockFormatter.format(new Date(startAt));
}

export function formatEventTimeRange(event: AppEvent): string {
  const start = clockFormatter.format(new Date(event.startAt));
  if (!event.endAt) return start;
  return `من ${start} إلى ${clockFormatter.format(new Date(event.endAt))}`;
}

function formatHoursAway(hours: number): string {
  if (hours <= 1) return "بعد ساعة";
  if (hours === 2) return "بعد ساعتين";
  return `بعد ${hours} ساعات`;
}

function formatDaysAway(days: number): string {
  if (days === 1) return "غداً";
  if (days === 2) return "بعد يومين";
  if (days <= 10) return `بعد ${days} أيام`;
  return `بعد ${days} يوماً`;
}

/** Answers "how far away is this?" in one short phrase. */
export function formatCountdown(event: AppEvent, now: Date): string {
  if (isOngoingEvent(event, now)) return "جارية الآن";
  if (isPastEvent(event, now)) return "انتهت";

  const start = new Date(event.startAt);
  const diff = start.getTime() - now.getTime();

  if (diff < HOUR_MS) return "بعد أقل من ساعة";

  const offset = dayOffset(now, start);
  if (offset === 0) return formatHoursAway(Math.floor(diff / HOUR_MS));
  return formatDaysAway(offset);
}

export function formatAttendingLabel(count: number): string {
  if (count === 0) return "لم يؤكد أحد حضوره بعد";
  if (count === 1) return "مشارك واحد أكّد حضوره";
  if (count === 2) return "مشاركان أكّدا حضورهما";
  if (count <= 10) return `${count} مشاركين أكّدوا حضورهم`;
  return `${count} مشاركاً أكّدوا حضورهم`;
}

export function formatPendingResponsesLabel(count: number): string {
  if (count === 2) return "بانتظار ردك على فعاليتين قادمتين";
  if (count <= 10) return `بانتظار ردك على ${count} فعاليات قادمة`;
  return `بانتظار ردك على ${count} فعالية قادمة`;
}

/** No answers accepted once the deadline passes, or once the event starts. */
export function isRsvpClosed(event: AppEvent, now: Date): boolean {
  if (new Date(event.startAt).getTime() <= now.getTime()) return true;
  if (!event.rsvpDeadline) return false;
  return new Date(event.rsvpDeadline).getTime() < now.getTime();
}

export function formatRsvpDeadline(deadline: string, now: Date): string {
  const date = new Date(deadline);
  if (date.getTime() < now.getTime()) return "انتهى موعد تأكيد الحضور";
  return `أكّد حضورك قبل ${formatEventDay(deadline, now)} · ${formatEventClock(
    deadline
  )}`;
}

export interface EventView {
  id: string;
  type: EventType;
  title: string;
  dayLabel: string;
  clockLabel: string;
  countdownLabel: string;
  locationName?: string;
  attendanceStatus?: AttendanceStatus;
  attendingCount: number;
  cancelled: boolean;
  past: boolean;
  ongoing: boolean;
  /** Waiting on the student: answerable, but not answered yet. */
  needsResponse: boolean;
}

/**
 * Card data is shaped on the server so the relative labels ("اليوم", "بعد
 * يومين") are computed once against a single `now` and can't drift on hydrate.
 */
export function buildEventView(event: AppEvent, now: Date): EventView {
  return {
    id: event.id,
    type: event.type,
    title: event.title,
    dayLabel: formatEventDay(event.startAt, now),
    clockLabel: formatEventClock(event.startAt),
    countdownLabel: formatCountdown(event, now),
    locationName: event.location?.name,
    attendanceStatus: event.attendance?.status,
    attendingCount: event.attendingCount,
    cancelled: Boolean(event.cancelled),
    past: isPastEvent(event, now),
    ongoing: isOngoingEvent(event, now),
    needsResponse:
      event.rsvpEnabled &&
      !event.cancelled &&
      !event.attendance &&
      !isRsvpClosed(event, now),
  };
}

export interface EventGroup {
  label: string;
  items: EventView[];
}

function upcomingGroupLabel(now: Date, date: Date): string {
  const offset = dayOffset(now, date);
  if (offset === 0) return "اليوم";
  if (offset === 1) return "غداً";
  if (offset <= 7) return "هذا الأسبوع";
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  ) {
    return "بقية هذا الشهر";
  }
  return "لاحقاً";
}

/** Expects `events` sorted oldest first. */
export function groupUpcomingEvents(
  events: AppEvent[],
  now: Date
): EventGroup[] {
  const groups = new Map<string, EventGroup>();

  for (const event of events) {
    const label = upcomingGroupLabel(now, new Date(event.startAt));
    const group = groups.get(label) ?? { label, items: [] };
    group.items.push(buildEventView(event, now));
    groups.set(label, group);
  }

  return [...groups.values()];
}
