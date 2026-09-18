import type { IconType } from "react-icons";
import { FiExternalLink } from "react-icons/fi";

interface InfoRowProps {
  icon: IconType;
  label: string;
  value: string;
  /** External link (maps, for example) shown under the value. */
  actionHref?: string;
  actionLabel?: string;
}

export default function InfoRow({
  icon: Icon,
  label,
  value,
  actionHref,
  actionLabel,
}: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-lightgrey last:border-none">
      <span className="w-8 h-8 shrink-0 rounded-full bg-lightgrey text-black flex items-center justify-center">
        <Icon size={14} />
      </span>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-[11px] font-light text-black/60">{label}</span>
        <span className="text-sm font-normal text-black leading-relaxed">
          {value}
        </span>
        {actionHref && (
          <a
            href={actionHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-normal text-main pt-1 hover:underline"
          >
            <FiExternalLink size={12} />
            {actionLabel ?? "فتح الموقع"}
          </a>
        )}
      </div>
    </div>
  );
}
