import Link from "next/link";
import { FiCalendar } from "react-icons/fi";
import TopBar from "@/components/TopBar";
import { getStudentById } from "@/lib/server/studentStore";
import MonthlyPlanClient from "./components/MonthlyPlanClient";

export default async function MonthlyReviewPage() {
  const student = await getStudentById("std-1");
  const currentMonth = student?.currentMonth;
  const hasGoal = Boolean(currentMonth && currentMonth.selectedJuz.length > 0);

  if (!student || !currentMonth || !hasGoal) {
    return (
      <main
        className="min-h-screen flex flex-col items-center pt-10 pb-24"
        dir="rtl"
      >
        <div className="w-full max-w-sm px-4 mx-auto flex flex-col space-y-6">
          <TopBar title="الخطة الشهرية" />

          <div className="w-full flex flex-col items-center text-center space-y-3 py-10">
            <FiCalendar size={40} className="text-lightgrey" />
            <span className="text-sm font-normal text-black">
              لم تحدد هدف هذا الشهر بعد
            </span>
            <span className="text-xs font-light text-black leading-relaxed">
              حدد أجزاء المراجعة من ملفك الشخصي لتظهر هنا خطتك اليومية
              التفصيلية.
            </span>
            <Link href="/profile" className="btn-primary max-w-[220px]">
              الانتقال إلى الملف الشخصي
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <MonthlyPlanClient studentId={student.id} currentMonth={currentMonth} />;
}
