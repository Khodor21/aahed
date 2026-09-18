"use client";

import { FiCalendar } from "react-icons/fi";

const HOUR_MS = 60 * 60 * 1000;

const toIcsStamp = (date: Date) =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const escapeText = (text: string) =>
  text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");

interface AddToCalendarProps {
  eventId: string;
  title: string;
  description: string;
  locationName?: string;
  startAt: string;
  endAt?: string;
}

/**
 * Hands the event to whatever calendar the phone already uses, with a reminder
 * two hours ahead, so the student doesn't depend on opening the app to remember.
 */
export default function AddToCalendar({
  eventId,
  title,
  description,
  locationName,
  startAt,
  endAt,
}: AddToCalendarProps) {
  const handleDownload = () => {
    const start = new Date(startAt);
    const end = endAt ? new Date(endAt) : new Date(start.getTime() + HOUR_MS);

    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ahd//Events//AR",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${eventId}@ahd.app`,
      `DTSTAMP:${toIcsStamp(new Date())}`,
      `DTSTART:${toIcsStamp(start)}`,
      `DTEND:${toIcsStamp(end)}`,
      `SUMMARY:${escapeText(title)}`,
      `DESCRIPTION:${escapeText(description)}`,
      ...(locationName ? [`LOCATION:${escapeText(locationName)}`] : []),
      "BEGIN:VALARM",
      "TRIGGER:-PT2H",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeText(title)}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    const blob = new Blob([lines.join("\r\n")], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ahd-${eventId}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="btn-secondary flex items-center justify-center gap-2"
    >
      <FiCalendar size={14} />
      أضف إلى تقويمك
    </button>
  );
}
