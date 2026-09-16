import { FiAward, FiBookOpen } from "react-icons/fi";
import type { Achievement } from "@/lib/types/student";

const icons = {
  award: FiAward,
  book: FiBookOpen,
};

interface AchievementBadgeProps {
  achievement: Achievement;
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const Icon = icons[achievement.icon];

  return (
    <div className="flex items-center gap-1 bg-white border border-lightgrey rounded-md px-3 py-1 text-xs font-light text-black whitespace-nowrap shrink-0">
      <Icon size={14} className="text-main" />
      <span>{achievement.label}</span>
    </div>
  );
}
