"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiBookOpen, FiEdit2, FiTarget } from "react-icons/fi";
import type { ReviewStatus, Student } from "@/lib/types/student";
import { updateMonthlyGoal } from "../api";
import { formatSelectedJuzLabel } from "@/lib/juz";
import TopBar from "@/components/TopBar";
import ProgressRing from "./ProgressRing";
import StatRow from "./StatRow";
import AchievementBadge from "./AchievementBadge";
import MonthlyHistoryItem from "./MonthlyHistoryItem";
import GoalDialog from "./GoalDialog";

const statusLabels: Record<ReviewStatus, string> = {
  on_track: "على المسار",
  behind: "متأخر قليلاً",
  not_started: "لم تبدأ بعد",
  completed: "أكملت الهدف",
};

interface ProfileClientProps {
  student: Student;
}

export default function ProfileClient({
  student: initialStudent,
}: ProfileClientProps) {
  const [student, setStudent] = useState(initialStudent);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { currentMonth } = student;
  const hasHistory = student.history.length > 0;

  const handleSaveGoal = async (selectedJuz: number[]) => {
    const updated = await updateMonthlyGoal(student.id, selectedJuz);
    setStudent((prev) => ({ ...prev, currentMonth: updated }));
    setDialogOpen(false);
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center pt-10 pb-24"
      dir="rtl"
    >
      <div className="w-full max-w-sm px-4 mx-auto flex flex-col space-y-6">
        <TopBar title="الملف الشخصي" />

        {/* Identity header */}
        <div className="w-full flex flex-col items-center text-center space-y-2">
          <div className="w-20 h-20 rounded-full bg-main text-white flex items-center justify-center text-2xl font-light">
            {student.avatarInitials}
          </div>
          <h2
            className="text-2xl font-light text-black"
            style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
          >
            {student.name}
          </h2>
          <span className="text-xs font-light text-black bg-lightgrey rounded-md px-3 py-1">
            {student.role}
          </span>
        </div>

        {/* Current month goal card */}
        {currentMonth && currentMonth.selectedJuz.length > 0 ? (
          <div className="w-full bg-white border border-lightgrey rounded-md p-4 flex flex-col items-center space-y-3">
            <div className="flex items-center justify-between w-full">
              <span className="w-4" />
              <span className="text-sm font-normal text-black">
                هدف هذا الشهر
              </span>
              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="text-black"
                aria-label="تعديل الهدف"
              >
                <FiEdit2 size={16} />
              </button>
            </div>
            <span
              className="text-lg font-normal text-main text-center"
              style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
            >
              {formatSelectedJuzLabel(currentMonth.selectedJuz)}
            </span>
            <ProgressRing
              percentage={
                (currentMonth.completedPages / currentMonth.targetPages) * 100
              }
            />
            <span className="text-sm font-light text-black">
              {currentMonth.completedPages} من {currentMonth.targetPages} صفحة ·{" "}
              {currentMonth.monthLabel}
            </span>
            <span
              className={`text-xs rounded-md px-2 py-1 ${
                currentMonth.status === "on_track" ||
                currentMonth.status === "completed"
                  ? "bg-main text-white"
                  : "bg-lightgrey text-black"
              }`}
            >
              {statusLabels[currentMonth.status]}
            </span>
            <Link
              href="/monthly-review"
              className="flex items-center gap-1 text-xs font-normal text-main hover:underline border-t border-lightgrey w-full justify-center pt-3 mt-1"
            >
              عرض الخطة الشهرية
              <FiArrowLeft size={12} />
            </Link>
          </div>
        ) : (
          <div className="w-full bg-white border border-lightgrey rounded-md p-6 flex flex-col items-center space-y-3 text-center">
            <FiTarget size={32} className="text-lightgrey" />
            <span className="text-sm font-normal text-black">
              لم تحدد هدف هذا الشهر بعد
            </span>
            <span className="text-xs font-light text-black">
              حدد الأجزاء التي ستراجعها هذا الشهر لتبدأ متابعة تقدمك
            </span>
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="btn-primary"
            >
              حدد هدف الشهر
            </button>
          </div>
        )}

        {/* Stat row */}
        <StatRow
          streakDays={student.streakDays}
          totalJuzReviewed={student.totalJuzReviewed}
          averageScore={student.averageScore}
        />

        {hasHistory ? (
          <>
            {/* Achievements */}

            <div className="w-full">
              <h3 className="text-sm font-normal text-black mb-2">إنجازاتك</h3>
              {student.achievements.length > 0 ? (
                <div className="flex flex-row gap-2 overflow-x-auto w-full pb-1">
                  {student.achievements.map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm font-light text-black ">
                  لا توجد إنجازات بعد. أكمل مراجعاتك الشهرية لتظهر إنجازاتك هنا.
                  بإنتظارك يا بطل
                </p>
              )}
            </div>

            {/* Monthly review history */}
            <div className="w-full">
              <h3 className="text-sm font-normal text-black mb-2">
                سجل المراجعة الشهري
              </h3>
              <div className="flex flex-col space-y-2 w-full">
                {student.history.map((review) => (
                  <MonthlyHistoryItem key={review.id} review={review} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center space-y-2 py-6">
            <FiBookOpen size={40} className="text-lightgrey" />
            <span className="text-sm font-light text-black">
              لم تبدأ رحلتك بعد
            </span>
            <span className="text-sm font-light text-black">
              أكمل أول شهر مراجعة لتظهر إنجازاتك وتقييماتك هنا.
            </span>
          </div>
        )}
      </div>

      {dialogOpen && (
        <GoalDialog
          onClose={() => setDialogOpen(false)}
          studentName={student.name}
          studentRole={student.role}
          avatarInitials={student.avatarInitials}
          initialSelectedJuz={currentMonth?.selectedJuz ?? []}
          onSave={handleSaveGoal}
        />
      )}
    </main>
  );
}
