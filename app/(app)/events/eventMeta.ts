import type { IconType } from "react-icons";
import {
  FiBookOpen,
  FiCheck,
  FiCompass,
  FiFlag,
  FiHelpCircle,
  FiMap,
  FiUsers,
  FiX,
} from "react-icons/fi";
import type { AttendanceStatus, EventType } from "@/lib/types/event";

export const eventTypeLabels: Record<EventType, string> = {
  recitation: "جلسة تسميع",
  meeting: "اجتماع",
  trip: "رحلة",
  outing: "خرجة",
  activity: "نشاط كشفي",
};

export const eventTypeIcons: Record<EventType, IconType> = {
  recitation: FiBookOpen,
  meeting: FiUsers,
  trip: FiMap,
  outing: FiCompass,
  activity: FiFlag,
};

/** The recitation session is the heart of the program, so it reads as primary. */
export const isKeyEventType = (type: EventType) => type === "recitation";

/** Button labels — what the student is choosing to do. */
export const attendanceActionLabels: Record<AttendanceStatus, string> = {
  going: "سأحضر",
  maybe: "غير متأكد",
  not_going: "لن أستطيع",
};

/** Chip labels — the answer already on record. */
export const attendanceStatusLabels: Record<AttendanceStatus, string> = {
  going: "أكّدت حضورك",
  maybe: "حضورك غير مؤكد",
  not_going: "أبلغت بعدم الحضور",
};

export const attendanceIcons: Record<AttendanceStatus, IconType> = {
  going: FiCheck,
  maybe: FiHelpCircle,
  not_going: FiX,
};

export const ATTENDANCE_OPTIONS: AttendanceStatus[] = [
  "going",
  "maybe",
  "not_going",
];
