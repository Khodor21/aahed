import { FiCalendar } from "react-icons/fi";
import TopBar from "@/components/TopBar";

export default function MonthlyReviewPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center pt-10 pb-24"
      dir="rtl"
    >
      <div className="w-full max-w-sm px-4 mx-auto flex flex-col space-y-6">
        <TopBar title="خطة المراجعة الشهرية" />

        <div className="w-full flex flex-col items-center text-center space-y-3 py-10">
          <FiCalendar size={40} className="text-lightgrey" />
          <span className="text-sm font-normal text-black">
            هذه الصفحة قيد الإنشاء
          </span>
          <span className="text-xs font-light text-black leading-relaxed">
            هنا ستتمكن قريباً من تقسيم هدفك الشهري إلى أهداف يومية وأسبوعية،
            ومتابعة تقدمك يوماً بيوم لمعرفة إن كنت على المسار الصحيح.
          </span>
        </div>
      </div>
    </main>
  );
}
