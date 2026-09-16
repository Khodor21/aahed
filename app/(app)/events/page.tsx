import { FiMapPin } from "react-icons/fi";
import TopBar from "@/components/TopBar";

export default function EventsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-10 pb-24" dir="rtl">
      <div className="w-full max-w-sm px-4 mx-auto flex flex-col space-y-6">
        <TopBar title="الفعاليات" />

        <div className="w-full flex flex-col items-center text-center space-y-3 py-10">
          <FiMapPin size={40} className="text-lightgrey" />
          <span className="text-sm font-normal text-black">
            لا توجد فعاليات قادمة بعد
          </span>
          <span className="text-xs font-light text-black leading-relaxed">
            هنا ستجد مواعيد جلسات المراجعة الكبرى، والرحلات، والأنشطة
            الكشفية، مع كل التفاصيل التي تحتاجها للمشاركة.
          </span>
        </div>
      </div>
    </main>
  );
}
