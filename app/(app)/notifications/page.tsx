import { FiBell } from "react-icons/fi";
import TopBar from "@/components/TopBar";

export default function NotificationsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-10 pb-24" dir="rtl">
      <div className="w-full max-w-sm px-4 mx-auto flex flex-col space-y-6">
        <TopBar title="الإشعارات" showNotificationsLink={false} />

        <div className="w-full flex flex-col items-center text-center space-y-3 py-10">
          <FiBell size={40} className="text-lightgrey" />
          <span className="text-sm font-normal text-black">
            لا توجد إشعارات بعد
          </span>
          <span className="text-xs font-light text-black leading-relaxed">
            ستصلك هنا تذكيرات هدفك اليومي، وتنبيهات مواعيد التسميع، وأي
            إعلانات عامة من المشرفين.
          </span>
        </div>
      </div>
    </main>
  );
}
