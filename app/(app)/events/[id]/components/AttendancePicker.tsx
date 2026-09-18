"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiUsers } from "react-icons/fi";
import type { AttendanceStatus } from "@/lib/types/event";
import { saveAttendance } from "../../api";
import {
  ATTENDANCE_OPTIONS,
  attendanceActionLabels,
  attendanceIcons,
} from "../../eventMeta";
import { formatAttendingLabel } from "../../format";

const CONFIRMATION_DURATION_MS = 2500;

const confirmationLabels: Record<AttendanceStatus, string> = {
  going: "تم تأكيد حضورك، بانتظارك!",
  maybe: "سجّلنا أن حضورك غير مؤكد",
  not_going: "سجّلنا اعتذارك عن الحضور",
};

interface AttendancePickerProps {
  studentId: string;
  eventId: string;
  initialStatus?: AttendanceStatus;
  initialNote?: string;
  initialAttendingCount: number;
  /** Shown above the choices while answers are still accepted. */
  deadlineLabel?: string;
  /** Deadline passed or the event already started — answers are locked. */
  closed: boolean;
}

export default function AttendancePicker({
  studentId,
  eventId,
  initialStatus,
  initialNote,
  initialAttendingCount,
  deadlineLabel,
  closed,
}: AttendancePickerProps) {
  const [status, setStatus] = useState<AttendanceStatus | undefined>(
    initialStatus
  );
  const [note, setNote] = useState(initialNote ?? "");
  const [savedNote, setSavedNote] = useState(initialNote ?? "");
  const [attendingCount, setAttendingCount] = useState(initialAttendingCount);
  const [pending, setPending] = useState<AttendanceStatus | null>(null);
  const [noteSaving, setNoteSaving] = useState(false);
  const [confirmation, setConfirmation] = useState<AttendanceStatus | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const confirmationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (confirmationTimeoutRef.current) {
        clearTimeout(confirmationTimeoutRef.current);
      }
    };
  }, []);

  const showConfirmation = (next: AttendanceStatus) => {
    if (confirmationTimeoutRef.current) {
      clearTimeout(confirmationTimeoutRef.current);
    }
    setConfirmation(next);
    confirmationTimeoutRef.current = setTimeout(
      () => setConfirmation(null),
      CONFIRMATION_DURATION_MS
    );
  };

  const choose = async (next: AttendanceStatus) => {
    if (closed || pending || next === status) return;

    const previous = status;
    setStatus(next);
    setError(null);
    setPending(next);

    try {
      const updated = await saveAttendance(
        studentId,
        eventId,
        next,
        next === "not_going" ? note : undefined
      );
      setAttendingCount(updated.attendingCount);
      setSavedNote(updated.attendance?.note ?? "");
      showConfirmation(next);
    } catch {
      setStatus(previous);
      setError("لم نتمكن من حفظ ردك، حاول مرة أخرى");
    } finally {
      setPending(null);
    }
  };

  const submitNote = async () => {
    if (!status || noteSaving) return;

    setError(null);
    setNoteSaving(true);
    try {
      const updated = await saveAttendance(studentId, eventId, status, note);
      setSavedNote(updated.attendance?.note ?? "");
      showConfirmation(status);
    } catch {
      setError("لم نتمكن من حفظ ملاحظتك، حاول مرة أخرى");
    } finally {
      setNoteSaving(false);
    }
  };

  const showNoteField = status === "not_going" && !closed;
  const noteChanged = note.trim() !== savedNote.trim();

  return (
    <div className="w-full bg-white border border-lightgrey rounded-md p-4 flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-normal text-black">حضورك</h3>
        <span className="flex items-center gap-1.5 text-[11px] font-light text-black/60">
          <FiUsers size={12} />
          {formatAttendingLabel(attendingCount)}
        </span>
      </div>

      {closed ? (
        <p className="text-xs font-light text-black leading-relaxed">
          {status
            ? "انتهى موعد التعديل، وردك مسجّل عند المشرفين."
            : "انتهى موعد تأكيد الحضور لهذه الفعالية."}
        </p>
      ) : (
        deadlineLabel && (
          <p className="text-xs font-light text-black leading-relaxed">
            {deadlineLabel}
          </p>
        )
      )}

      <div className="flex items-center gap-2">
        {ATTENDANCE_OPTIONS.map((option) => {
          const Icon = attendanceIcons[option];
          const selected = status === option;
          const isPending = pending === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              disabled={closed || Boolean(pending)}
              aria-pressed={selected}
              className={`flex-1 flex flex-col items-center gap-1 rounded-md border py-2.5 transition-all duration-200 ${
                selected
                  ? "border-main bg-main/10 text-main"
                  : "border-lightgrey bg-white text-black hover:border-main/30"
              } ${
                closed
                  ? "opacity-60 cursor-not-allowed"
                  : "active:scale-[0.97] cursor-pointer"
              } ${isPending ? "opacity-70" : ""}`}
            >
              <Icon size={16} className="shrink-0" />
              <span
                className={`text-[11px] ${
                  selected ? "font-normal" : "font-light"
                }`}
              >
                {attendanceActionLabels[option]}
              </span>
            </button>
          );
        })}
      </div>

      {showNoteField && (
        <div className="flex flex-col space-y-2 pt-1">
          <label
            htmlFor="attendance-note"
            className="text-xs font-light text-black"
          >
            سبب عدم الحضور (اختياري) — يساعد المشرفين على متابعتك
          </label>
          <textarea
            id="attendance-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={2}
            maxLength={200}
            placeholder="مثال: لدي التزام دراسي في نفس الموعد"
            className="input-field resize-none leading-relaxed"
          />
          <button
            type="button"
            onClick={submitNote}
            disabled={!noteChanged || noteSaving}
            className="btn-secondary disabled:opacity-50"
          >
            {noteSaving ? "جارٍ الحفظ..." : "حفظ السبب"}
          </button>
        </div>
      )}

      {closed && status === "not_going" && savedNote && (
        <p className="text-xs font-light text-black leading-relaxed">
          <span className="font-normal">السبب المسجّل: </span>
          {savedNote}
        </p>
      )}

      {error && (
        <span className="text-xs font-normal text-main">{error}</span>
      )}

      <div
        role="status"
        aria-live="polite"
        className={`flex items-center gap-2 transition-all duration-300 ${
          confirmation
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1 h-0 overflow-hidden"
        }`}
      >
        {confirmation && (
          <>
            <FiCheckCircle
              size={14}
              className="text-main shrink-0 animate-check-pop"
            />
            <span className="text-xs font-normal text-main">
              {confirmationLabels[confirmation]}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
