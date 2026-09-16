"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import { buildDailyPlan, getDaysInMonth } from "@/lib/dailyPlan";
import { formatSelectedJuzLabel } from "@/lib/juz";
import type { MonthlyReviewSummary } from "@/lib/types/student";
import { toggleDayCompletion } from "../api";
import DayCard from "./DayCard";

interface MonthlyPlanClientProps {
  studentId: string;
  currentMonth: MonthlyReviewSummary;
}

const weekdayFormatter = new Intl.DateTimeFormat("ar", { weekday: "short" });

export default function MonthlyPlanClient({
  studentId,
  currentMonth: initialCurrentMonth,
}: MonthlyPlanClientProps) {
  const [currentMonth, setCurrentMonth] = useState(initialCurrentMonth);
  const [pendingDay, setPendingDay] = useState<number | null>(null);

  const [year, month] = currentMonth.id.split("-").map(Number);
  const daysInMonth = getDaysInMonth(year, month);
  const plan = buildDailyPlan(currentMonth.targetPages, daysInMonth);

  const today = new Date();
  const isCurrentCalendarMonth =
    today.getFullYear() === year && today.getMonth() + 1 === month;
  const todayDay = isCurrentCalendarMonth ? today.getDate() : 0;

  const completedSet = new Set(currentMonth.completedDays);
  const percentage =
    currentMonth.targetPages > 0
      ? Math.round((currentMonth.completedPages / currentMonth.targetPages) * 100)
      : 0;

  const handleToggle = async (day: number, completed: boolean) => {
    setPendingDay(day);
    try {
      const updated = await toggleDayCompletion(studentId, day, completed);
      setCurrentMonth(updated);
    } catch {
      // request failed — leave the card in its previous state
    } finally {
      setPendingDay(null);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-10 pb-24" dir="rtl">
      <div className="w-full max-w-sm px-4 mx-auto flex flex-col space-y-6">
        <TopBar title="الخطة الشهرية" />

        {/* Summary */}
        <div className="w-full flex flex-col items-center text-center space-y-2">
          <span className="text-sm font-normal text-black">هدفك هذا الشهر</span>
          <span
            className="text-lg font-normal text-main"
            style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
          >
            {formatSelectedJuzLabel(currentMonth.selectedJuz)}
          </span>
          <div className="w-full bg-lightgrey rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-main rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs font-light text-black">
            {currentMonth.completedPages} من {currentMonth.targetPages} صفحة ·{" "}
            {percentage}٪
          </span>
        </div>

        {/* Daily list */}
        <div className="w-full flex flex-col space-y-2">
          {plan.map((d) => {
            const dateObj = new Date(year, month - 1, d.day);
            const isToday = isCurrentCalendarMonth && d.day === todayDay;
            const isLocked = isCurrentCalendarMonth ? d.day > todayDay : false;
            const isCompleted = completedSet.has(d.day);

            return (
              <DayCard
                key={d.day}
                day={d.day}
                weekdayLabel={weekdayFormatter.format(dateObj)}
                pages={d.pages}
                startPage={d.startPage}
                endPage={d.endPage}
                isLocked={isLocked}
                isToday={isToday}
                isCompleted={isCompleted}
                disabled={pendingDay === d.day}
                onToggle={() => handleToggle(d.day, !isCompleted)}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
