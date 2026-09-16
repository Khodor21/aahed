import type { IconType } from "react-icons";
import { FiBookOpen, FiStar, FiZap } from "react-icons/fi";

interface StatRowProps {
  streakDays: number;
  totalJuzReviewed: number;
  averageScore: number;
}

interface StatItem {
  icon: IconType;
  value: string | number;
  label: string;
}

export default function StatRow({
  streakDays,
  totalJuzReviewed,
  averageScore,
}: StatRowProps) {
  const items: StatItem[] = [
    { icon: FiZap, value: streakDays, label: "التزام متتالٍ" },
    { icon: FiBookOpen, value: totalJuzReviewed, label: "إجمالي الأجزاء" },
    { icon: FiStar, value: averageScore, label: "متوسط التقييم" },
  ];

  return (
    <div className="w-full bg-white border border-lightgrey rounded-md flex items-stretch">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`flex-1 flex flex-col items-center gap-1 py-3 ${
            index !== items.length - 1 ? "border-l border-lightgrey" : ""
          }`}
        >
          <item.icon size={18} className="text-main" />
          <span className="text-base font-normal text-black">{item.value}</span>
          <span className="text-[11px] font-light text-black">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
