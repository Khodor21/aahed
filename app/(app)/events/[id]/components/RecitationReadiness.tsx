import Link from "next/link";
import { FiAlertCircle, FiArrowLeft, FiCheckCircle, FiTarget } from "react-icons/fi";
import { formatPagesLabel } from "@/lib/juz";

interface RecitationReadinessProps {
  monthLabel: string;
  juzLabel: string;
  targetPages: number;
  completedPages: number;
  /** Pages the plan expects to be done by today. */
  expectedPages: number;
  countdownLabel: string;
}

/**
 * Connects the session to the month it exists for: the student sees, on the
 * event itself, whether they are ready to recite in front of the sheikh.
 */
export default function RecitationReadiness({
  monthLabel,
  juzLabel,
  targetPages,
  completedPages,
  expectedPages,
  countdownLabel,
}: RecitationReadinessProps) {
  const percentage =
    targetPages > 0
      ? Math.min(100, Math.round((completedPages / targetPages) * 100))
      : 0;
  const remaining = Math.max(0, targetPages - completedPages);
  const behindBy = Math.max(0, expectedPages - completedPages);

  const ready = remaining === 0;
  const onTrack = !ready && behindBy === 0;

  const StatusIcon = ready
    ? FiCheckCircle
    : onTrack
      ? FiTarget
      : FiAlertCircle;

  const statusText = ready
    ? "أتممت ورد الشهر كاملاً، أنت جاهز للتسميع بإذن الله."
    : onTrack
      ? `أنت على المسار، ويتبقى ${formatPagesLabel(remaining)} حتى تُتم وردك قبل الجلسة.`
      : `أنت متأخر بـ${formatPagesLabel(behindBy)} عن خطتك، ويتبقى ${formatPagesLabel(
          remaining
        )} حتى الجلسة.`;

  return (
    <div className="w-full bg-white border border-lightgrey rounded-md p-4 flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-normal text-black">استعدادك للجلسة</h3>
        <span className="text-[11px] font-light text-black bg-lightgrey rounded-md px-2 py-0.5">
          {countdownLabel}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-light text-black/60">
          ما ستسمّعه · {monthLabel}
        </span>
        <span
          className="text-sm font-normal text-main"
          style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
        >
          {juzLabel}
        </span>
      </div>

      <div className="w-full bg-lightgrey rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-main rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="text-xs font-light text-black">
        {completedPages} من {targetPages} صفحة · {percentage}٪
      </span>

      <div
        className={`flex items-start gap-2 rounded-md p-2.5 ${
          ready || onTrack ? "bg-main/5" : "bg-lightgrey"
        }`}
      >
        <StatusIcon
          size={14}
          className={`shrink-0 mt-0.5 ${
            ready || onTrack ? "text-main" : "text-black"
          }`}
        />
        <span className="text-xs font-light text-black leading-relaxed">
          {statusText}
        </span>
      </div>

      <Link
        href="/monthly-review"
        className="flex items-center justify-center gap-1 text-xs font-normal text-main border-t border-lightgrey w-full pt-3 hover:underline"
      >
        عرض الخطة الشهرية
        <FiArrowLeft size={12} />
      </Link>
    </div>
  );
}
