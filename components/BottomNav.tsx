"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiCalendar, FiHome, FiMapPin, FiUser } from "react-icons/fi";
import type { IconType } from "react-icons";

interface NavItem {
  href: string;
  label: string;
  icon: IconType;
}

const navItems: NavItem[] = [
  { href: "/home", label: "الرئيسية", icon: FiHome },
  { href: "/monthly-review", label: "الخطة اليومية", icon: FiCalendar },
  { href: "/events", label: "الفعاليات", icon: FiMapPin },
  { href: "/profile", label: "حسابي", icon: FiUser },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 bg-white border-t border-lightgrey pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-sm mx-auto flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1"
            >
              <span
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 ${
                  active ? "bg-main/10" : ""
                }`}
              >
                <item.icon
                  size={20}
                  className={`transition-colors duration-200 ${
                    active ? "text-main" : "text-black"
                  }`}
                />
              </span>
              <span
                className={`text-[11px] transition-colors duration-200 ${
                  active ? "text-main font-normal" : "text-black font-light"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
