import type {
  AppEvent,
  AttendanceStatus,
  EventAttendance,
} from "@/lib/types/event";

/**
 * In-memory data store standing in for a real database.
 * Only import this from Route Handlers (app/api/**) or Server Components —
 * never from a "use client" file. Replace with real DB calls when the
 * backend exists; callers (the route handlers) don't need to change.
 *
 * Shaped like the future schema: events are shared by everyone, and each
 * student's attendance answer lives in its own keyed collection (the join
 * table), merged into the event on read.
 */

/** An event as the organizers created it — no per-student data. */
type EventRecord = Omit<AppEvent, "attendance">;

/** ISO timestamp for a local clock time, `days` away from now. */
const at = (days: number, hour: number, minute = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

const seedEvents: EventRecord[] = [
  {
    id: "ev-1",
    type: "activity",
    title: "أمسية كشفية ومسابقة قرآنية",
    description:
      "أمسية في مقر الفوج تتضمن مسابقة قرآنية بين الطلائع، وفواصل من الأناشيد الكشفية، وتكريم المتميزين في مراجعة هذا الشهر.",
    startAt: at(0, 19, 30),
    endAt: at(0, 21, 30),
    location: { name: "مقر الفوج الكشفي — الساحة الخارجية" },
    organizer: "قائد الفوج",
    notes: ["المسابقة من الجزء الذي تراجعه هذا الشهر"],
    requirements: ["الزي الكشفي"],
    rsvpEnabled: true,
    attendingCount: 18,
  },
  {
    id: "ev-2",
    type: "meeting",
    title: "اجتماع الفوج الأسبوعي",
    description:
      "اللقاء الأسبوعي المعتاد لمتابعة سير المراجعة، ومناقشة خطة الأسبوع القادم، والإجابة عن استفسارات الطلاب.",
    startAt: at(2, 17, 0),
    endAt: at(2, 18, 30),
    location: { name: "مقر الفوج الكشفي — قاعة النشاط" },
    organizer: "قائد الفوج",
    notes: ["من تعذّر حضوره يتابع ملخص الاجتماع في الإشعارات"],
    requirements: [],
    rsvpEnabled: true,
    attendingCount: 21,
  },
  {
    id: "ev-3",
    type: "activity",
    title: "تدريب على فنون الخلاء",
    description:
      "تدريب عملي على العقد والرباطات ونصب الخيام، تمهيداً لرحلة الفوج القادمة.",
    startAt: at(5, 17, 0),
    endAt: at(5, 19, 0),
    location: { name: "مقر الفوج الكشفي" },
    organizer: "قائد الفوج",
    notes: ["تم تأجيل التدريب إلى موعد يُعلن عنه لاحقاً"],
    requirements: [],
    rsvpEnabled: true,
    attendingCount: 0,
    cancelled: true,
  },
  {
    id: "ev-4",
    type: "recitation",
    title: "جلسة التسميع الموسّعة — سبتمبر",
    description:
      "الجلسة الشهرية الكبرى التي يلتقي فيها الطلاب بالمشايخ، ويسمّع كل طالب ورده الشهري كاملاً، ثم يستلم تقييمه وملاحظات شيخه على الأداء.",
    startAt: at(11, 16, 30),
    endAt: at(11, 19, 0),
    location: {
      name: "مسجد الفوج — المصلى الرئيسي",
      mapUrl: "https://maps.google.com/?q=15.3694,44.1910",
    },
    organizer: "الشيخ عبدالله",
    notes: [
      "التسميع من الحفظ دون النظر في المصحف",
      "الحضور قبل الموعد بعشر دقائق لتنظيم الأدوار",
      "يستلم كل طالب تقييمه وملاحظات الشيخ في نهاية الجلسة",
    ],
    requirements: ["مصحفك الخاص", "دفتر الملاحظات"],
    rsvpDeadline: at(9, 21, 0),
    rsvpEnabled: true,
    attendingCount: 14,
    relatedMonthId: "2026-09",
  },
  {
    id: "ev-5",
    type: "trip",
    title: "رحلة الفوج إلى جبل صبر",
    description:
      "رحلة يوم كامل تتضمن مسيراً جبلياً، ونشاطاً كشفياً في الهواء الطلق، وحلقة قرآن جماعية بعد صلاة الظهر.",
    startAt: at(24, 6, 0),
    endAt: at(24, 18, 0),
    location: {
      name: "التحرك من مقر الفوج — الوصول إلى جبل صبر",
      mapUrl: "https://maps.google.com/?q=13.5167,44.0167",
    },
    organizer: "لجنة الأنشطة",
    notes: [
      "التحرك في السادسة صباحاً تماماً، ولا انتظار للمتأخرين",
      "الرحلة تتطلب موافقة ولي الأمر قبل موعد التأكيد",
      "الأماكن محدودة، والأولوية لمن أكّد حضوره أولاً",
    ],
    requirements: [
      "حقيبة ظهر خفيفة",
      "ماء يكفي اليوم كاملاً",
      "قبعة وحذاء مناسب للمسير",
      "مصحف جيب",
    ],
    rsvpDeadline: at(17, 21, 0),
    rsvpEnabled: true,
    attendingCount: 9,
  },
  {
    id: "ev-6",
    type: "outing",
    title: "خرجة خدمة عامة — تنظيف الحي",
    description:
      "خرجة صباحية شارك فيها الفوج في تنظيف شوارع الحي وتوزيع مطويات توعوية على السكان.",
    startAt: at(-6, 8, 0),
    endAt: at(-6, 11, 0),
    location: { name: "حي الروضة — نقطة التجمع أمام المسجد" },
    organizer: "لجنة الأنشطة",
    notes: [],
    requirements: [],
    rsvpEnabled: true,
    attendingCount: 16,
  },
  {
    id: "ev-7",
    type: "recitation",
    title: "جلسة التسميع الموسّعة — أغسطس",
    description:
      "الجلسة الشهرية الكبرى لشهر أغسطس، سمّع فيها كل طالب ورده الشهري واستلم تقييم شيخه.",
    startAt: at(-21, 16, 30),
    endAt: at(-21, 19, 0),
    location: { name: "مسجد الفوج — المصلى الرئيسي" },
    organizer: "الشيخ عبدالله",
    notes: [],
    requirements: [],
    rsvpEnabled: true,
    attendingCount: 17,
    relatedMonthId: "2026-08",
  },
];

const eventStore = new Map<string, EventRecord>(
  seedEvents.map((event) => [event.id, event])
);

/** studentId → (eventId → that student's answer). */
const attendanceStore = new Map<string, Map<string, EventAttendance>>([
  [
    "std-1",
    new Map<string, EventAttendance>([
      ["ev-2", { status: "going", respondedAt: at(-1, 20, 0) }],
      ["ev-6", { status: "going", respondedAt: at(-9, 19, 0) }],
      ["ev-7", { status: "going", respondedAt: at(-24, 20, 0) }],
    ]),
  ],
]);

function withAttendance(event: EventRecord, studentId: string): AppEvent {
  const attendance = attendanceStore.get(studentId)?.get(event.id);
  return attendance ? { ...event, attendance } : { ...event };
}

/** Oldest first, so callers can split the list at "now" without re-sorting. */
export async function getEvents(studentId: string): Promise<AppEvent[]> {
  return [...eventStore.values()]
    .sort((a, b) => a.startAt.localeCompare(b.startAt))
    .map((event) => withAttendance(event, studentId));
}

export async function getEventById(
  studentId: string,
  eventId: string
): Promise<AppEvent | undefined> {
  const event = eventStore.get(eventId);
  return event ? withAttendance(event, studentId) : undefined;
}

export async function setAttendance(
  studentId: string,
  eventId: string,
  status: AttendanceStatus,
  note?: string
): Promise<AppEvent | undefined> {
  const event = eventStore.get(eventId);
  if (!event) return undefined;

  const studentAnswers =
    attendanceStore.get(studentId) ?? new Map<string, EventAttendance>();
  const wasGoing = studentAnswers.get(eventId)?.status === "going";
  const isGoing = status === "going";

  studentAnswers.set(eventId, {
    status,
    note: note?.trim() ? note.trim() : undefined,
    respondedAt: new Date().toISOString(),
  });
  attendanceStore.set(studentId, studentAnswers);

  // The count covers every student, so only this student's delta applies.
  const updated: EventRecord = {
    ...event,
    attendingCount:
      event.attendingCount + (isGoing ? 1 : 0) - (wasGoing ? 1 : 0),
  };
  eventStore.set(eventId, updated);

  return withAttendance(updated, studentId);
}
