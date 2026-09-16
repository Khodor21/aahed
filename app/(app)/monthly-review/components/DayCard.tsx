import type { KeyboardEvent } from "react";
import { FiCheckCircle, FiCircle, FiLock, FiRepeat } from "react-icons/fi";
import type { DayPlanType } from "@/lib/dailyPlan";

interface DayCardProps {
  day: number;
  weekdayLabel: string;
  pages: number;
  startPage: number | null;
  endPage: number | null;
  type: DayPlanType;
  isLocked: boolean;
  isToday: boolean;
  isCompleted: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export default function DayCard({
  day,
  weekdayLabel,
  pages,
  startPage,
  endPage,
  type,
  isLocked,
  isToday,
  isCompleted,
  disabled = false,
  onToggle,
}: DayCardProps) {
  const isReview = type === "review";
  const isInteractive = !isLocked && !disabled;

  const rangeLabel = isReview
    ? pages === 1
      ? "مراجعة الصفحة 1"
      : `مراجعة الصفحات 1-${endPage}`
    : pages === 1
      ? `صفحة ${startPage}`
      : `صفحات ${startPage}-${endPage}`;

  const badgeClasses = isToday
    ? "bg-main text-white"
    : isReview
      ? "bg-black text-white"
      : "bg-lightgrey text-black";

  const cardClasses = isLocked
    ? "border-lightgrey bg-white opacity-50 cursor-not-allowed"
    : isToday
      ? "border-main bg-main/5 cursor-pointer active:scale-[0.98]"
      : "border-lightgrey bg-white cursor-pointer hover:border-main/30 active:scale-[0.98]";

  const handleClick = () => {
    if (!isInteractive) return;
    onToggle();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={
        isInteractive
          ? isCompleted
            ? "إلغاء إتمام اليوم"
            : "إتمام اليوم"
          : "يوم مقفل، لم يحن موعده بعد"
      }
      aria-disabled={disabled || isLocked || undefined}
      className={`flex items-center justify-between w-full border rounded-md p-3 transition-all duration-200 ${cardClasses} ${
        isCompleted ? "animate-card-complete" : ""
      } ${disabled ? "opacity-60 pointer-events-none" : ""}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-normal transition-colors duration-200 ${badgeClasses}`}
        >
          {day}
        </span>
        <div className="flex flex-col items-start">
          <span className="flex items-center gap-1.5 text-sm font-normal text-black">
            {isReview ? <FiRepeat size={13} className="shrink-0" /> : null}
            {rangeLabel}
          </span>
          <span className="text-xs font-light text-black">{weekdayLabel}</span>
        </div>
      </div>

      {isLocked ? (
        <span
          aria-hidden="true"
          className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-lightgrey/50 text-lightgrey"
        >
          <FiLock size={16} />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-full transition-colors duration-200 ${
            isCompleted ? "text-main" : "text-lightgrey"
          }`}
        >
          {isCompleted ? (
            <FiCheckCircle key="check" size={22} className="animate-check-pop" />
          ) : (
            <FiCircle size={22} />
          )}
        </span>
      )}
    </div>
  );
}
