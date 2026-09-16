import { FiCheckCircle, FiCircle, FiLock } from "react-icons/fi";

interface DayCardProps {
  day: number;
  weekdayLabel: string;
  pages: number;
  startPage: number | null;
  endPage: number | null;
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
  isLocked,
  isToday,
  isCompleted,
  disabled = false,
  onToggle,
}: DayCardProps) {
  const isRestDay = pages === 0;

  const rangeLabel = isRestDay
    ? "يوم راحة"
    : pages === 1
      ? `صفحة ${startPage}`
      : `صفحات ${startPage}-${endPage}`;

  const badgeClasses = isToday
    ? "bg-main text-white"
    : isRestDay
      ? "bg-white border border-lightgrey text-black"
      : "bg-lightgrey text-black";

  const cardClasses = isRestDay
    ? "border-lightgrey bg-lightgrey/20"
    : isToday
      ? "border-main bg-main/5"
      : isLocked
        ? "border-lightgrey bg-white opacity-50"
        : "border-lightgrey bg-white";

  return (
    <div
      className={`flex items-center justify-between w-full border rounded-md p-3 transition-colors duration-200 ${cardClasses}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-normal transition-colors duration-200 ${badgeClasses}`}
        >
          {day}
        </span>
        <div className="flex flex-col items-start">
          <span className="text-sm font-normal text-black">{rangeLabel}</span>
          <span className="text-xs font-light text-black">{weekdayLabel}</span>
        </div>
      </div>

      {isRestDay ? null : isLocked ? (
        <FiLock size={18} className="text-lightgrey" />
      ) : (
        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          aria-label={isCompleted ? "إلغاء إتمام اليوم" : "إتمام اليوم"}
          className="text-lightgrey hover:text-main transition-colors duration-200 disabled:opacity-50"
        >
          {isCompleted ? (
            <FiCheckCircle size={22} className="text-main" />
          ) : (
            <FiCircle size={22} />
          )}
        </button>
      )}
    </div>
  );
}
