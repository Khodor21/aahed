import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface TopBarProps {
  title: string;
  backHref: string;
}

export default function TopBar({ title, backHref }: TopBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-white flex items-center justify-between w-full py-2">
      <Link href={backHref} className="text-black">
        <FiArrowRight size={20} />
      </Link>
      <h1
        className="text-lg font-normal text-black"
        style={{ fontFeatureSettings: '"ss01" on, "calt" on' }}
      >
        {title}
      </h1>
      <span className="w-5" />
    </div>
  );
}
