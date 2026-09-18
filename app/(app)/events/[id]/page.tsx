import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckSquare,
  FiClock,
  FiMapPin,
  FiSlash,
  FiStar,
  FiUser,
} from "react-icons/fi";
import TopBar from "@/components/TopBar";
import {
  buildDailyPlan,
  calculateExpectedPages,
  getDaysInMonth,
} from "@/lib/dailyPlan";
import { formatSelectedJuzLabel } from "@/lib/juz";
import { getEventById } from "@/lib/server/eventStore";
import { getStudentById } from "@/lib/server/studentStore";
import type { MonthlyReviewSummary } from "@/lib/types/student";
import { eventTypeIcons, eventTypeLabels } from "../eventMeta";
import {
  formatCountdown,
  formatEventFullDate,
  formatEventTimeRange,
  formatRsvpDeadline,
  isOngoingEvent,
  isPastEvent,
  isRsvpClosed,
} from "../format";
import AddToCalendar from "./components/AddToCalendar";
import AttendancePicker from "./components/AttendancePicker";
import InfoRow from "./components/InfoRow";
import RecitationReadiness from "./components/RecitationReadiness";

const STUDENT_ID = "std-1";

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

/** The month this session recites, whether it's the running month or history. */
function findMonth(
  monthId: string,
  currentMonth: MonthlyReviewSummary | null,
  history: MonthlyReviewSummary[]
): MonthlyReviewSummary | undefined {
  if (currentMonth?.id === monthId) return currentMonth;
  return history.find((month) => month.id === monthId);
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;
  const event = await getEventById(STUDENT_ID, id);

  if (!event) notFound();

  const now = new Date();
  const past = isPastEvent(event, now);
  const ongoing = isOngoingEvent(event, now);
  const cancelled = Boolean(event.cancelled);
  const countdownLabel = formatCountdown(event, now);
  const TypeIcon = eventTypeIcons[event.type];

  // A recitation session only makes sense next to the month it belongs to.
  const relatedMonthId =
    event.type === "recitation" ? event.relatedMonthId : undefined;
  let month: MonthlyReviewSummary | undefined;
  if (relatedMonthId) {
    const student = await getStudentById(STUDENT_ID);
    month = student
      ? findMonth(relatedMonthId, student.currentMonth, student.history)
      : undefined;
  }
  const hasGoal = Boolean(month && month.targetPages > 0);

  let expectedPages = 0;
  if (hasGoal && month && !past) {
    const [year, monthNumber] = month.id.split("-").map(Number);
    const daysInMonth = getDaysInMonth(year, monthNumber);
    const plan = buildDailyPlan(month.targetPages, daysInMonth);
    const isRunningMonth =
      now.getFullYear() === year && now.getMonth() + 1 === monthNumber;
    expectedPages = calculateExpectedPages(
      plan,
      isRunningMonth ? now.getDate() : daysInMonth
    );
  }

  const evaluation = past && hasGoal ? month?.evaluation : undefined;

  return (
    <main className="min-h-screen flex flex-col items-center pt-10 pb-24" dir="rtl">
      <div className="w-full max-w-sm px-4 mx-auto flex flex-col space-y-5">
        <TopBar title="تفاصيل الفعالية" backHref="/events" />

        {/* Header */}
        <div className="w-full flex flex-col space-y-3 animate-fade-slide-up">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[11px] font-light text-black bg-lightgrey rounded-md px-2 py-0.5">
              <TypeIcon size={11} />
              {eventTypeLabels[event.type]}
            </span>
            {cancelled ? (
              <span className="text-[11px] font-normal text-main">ملغاة</span>
            ) : (
              <span
                className={`text-[11px] font-normal ${
                  past ? "text-black/60" : "text-main"
                }`}
              >
                {countdownLabel}
              </span>
            )}
          </div>

          <h2
            className="text-xl font-light text-black leading-snug"
            style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
          >
            {event.title}
          </h2>

          <p className="text-xs font-light text-black leading-relaxed">
            {event.description}
          </p>
        </div>

        {cancelled && (
          <div className="w-full flex items-start gap-3 border border-main/30 bg-main/5 rounded-md p-3">
            <span className="w-9 h-9 shrink-0 rounded-full bg-main/10 text-main flex items-center justify-center">
              <FiSlash size={16} />
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-normal text-black">
                تم إلغاء هذه الفعالية
              </span>
              <span className="text-xs font-light text-black leading-relaxed">
                لا حاجة لتأكيد حضورك. راجع ملاحظات المشرفين أدناه لمعرفة
                التفاصيل.
              </span>
            </div>
          </div>
        )}

        {ongoing && !cancelled && (
          <div className="w-full flex items-center gap-2 border border-main/30 bg-main/5 rounded-md p-3">
            <span className="w-1.5 h-1.5 rounded-full bg-main shrink-0" />
            <span className="text-xs font-normal text-main">
              الفعالية جارية الآن
            </span>
          </div>
        )}

        {/* Time, place and organizer */}
        <div className="w-full bg-white border border-lightgrey rounded-md px-3">
          <InfoRow
            icon={FiCalendar}
            label="التاريخ"
            value={formatEventFullDate(event.startAt)}
          />
          <InfoRow
            icon={FiClock}
            label="الوقت"
            value={formatEventTimeRange(event)}
          />
          {event.location && (
            <InfoRow
              icon={FiMapPin}
              label="المكان"
              value={event.location.name}
              actionHref={event.location.mapUrl}
              actionLabel="فتح الموقع على الخريطة"
            />
          )}
          <InfoRow icon={FiUser} label="المنظّم" value={event.organizer} />
        </div>

        {/* Readiness for the monthly recitation */}
        {month && hasGoal && !past && !cancelled && (
          <RecitationReadiness
            monthLabel={month.monthLabel}
            juzLabel={formatSelectedJuzLabel(month.selectedJuz)}
            targetPages={month.targetPages}
            completedPages={month.completedPages}
            expectedPages={expectedPages}
            countdownLabel={countdownLabel}
          />
        )}

        {/* Outcome of a past recitation session */}
        {past && event.type === "recitation" && month && (
          <div className="w-full bg-white border border-lightgrey rounded-md p-4 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-normal text-black">نتيجة الجلسة</h3>
              {evaluation && (
                <span className="flex items-center gap-1 text-xs font-normal text-main">
                  <FiStar size={12} />
                  {evaluation.score}/10
                </span>
              )}
            </div>

            {evaluation ? (
              <>
                <span className="text-xs font-light text-black">
                  {formatSelectedJuzLabel(month.selectedJuz)} ·{" "}
                  {month.monthLabel}
                </span>
                <span className="text-xs font-normal text-black">
                  المعلّم: {evaluation.teacherName}
                </span>
                {evaluation.notes && (
                  <p className="text-xs font-light text-black leading-relaxed">
                    <span className="font-normal">ملاحظات المعلّم: </span>
                    {evaluation.notes}
                  </p>
                )}
                <Link
                  href="/profile"
                  className="flex items-center justify-center gap-1 text-xs font-normal text-main border-t border-lightgrey w-full pt-3 mt-1 hover:underline"
                >
                  عرض سجل تقييماتك
                  <FiArrowLeft size={12} />
                </Link>
              </>
            ) : (
              <p className="text-xs font-light text-black leading-relaxed">
                لم يصل تقييم هذه الجلسة بعد. سيظهر هنا وفي ملفك الشخصي بمجرد أن
                يسجّله شيخك.
              </p>
            )}
          </div>
        )}

        {/* Organizer notes */}
        {event.notes.length > 0 && (
          <div className="w-full flex flex-col space-y-2">
            <h3 className="text-sm font-normal text-black">ملاحظات المشرفين</h3>
            <ul className="w-full bg-white border border-lightgrey rounded-md p-3 flex flex-col gap-2">
              {event.notes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2 text-xs font-light text-black leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-main mt-1.5" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Packing list */}
        {event.requirements.length > 0 && !cancelled && (
          <div className="w-full flex flex-col space-y-2">
            <h3 className="text-sm font-normal text-black">ما تحتاج إحضاره</h3>
            <ul className="w-full bg-white border border-lightgrey rounded-md p-3 flex flex-col gap-2">
              {event.requirements.map((requirement) => (
                <li
                  key={requirement}
                  className="flex items-start gap-2 text-xs font-light text-black leading-relaxed"
                >
                  <FiCheckSquare
                    size={13}
                    className="text-main shrink-0 mt-0.5"
                  />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Attendance */}
        {event.rsvpEnabled && !cancelled && (
          <AttendancePicker
            studentId={STUDENT_ID}
            eventId={event.id}
            initialStatus={event.attendance?.status}
            initialNote={event.attendance?.note}
            initialAttendingCount={event.attendingCount}
            deadlineLabel={
              event.rsvpDeadline
                ? formatRsvpDeadline(event.rsvpDeadline, now)
                : undefined
            }
            closed={isRsvpClosed(event, now)}
          />
        )}

        {!past && !cancelled && (
          <AddToCalendar
            eventId={event.id}
            title={event.title}
            description={event.description}
            locationName={event.location?.name}
            startAt={event.startAt}
            endAt={event.endAt}
          />
        )}
      </div>
    </main>
  );
}
