export type EventType =
  | "recitation"
  | "meeting"
  | "trip"
  | "outing"
  | "activity";

/** The student's own answer to "will you be there?". */
export type AttendanceStatus = "going" | "maybe" | "not_going";

export interface EventLocation {
  name: string;
  /** Maps link, when the organizers provided one. */
  mapUrl?: string;
}

export interface EventAttendance {
  status: AttendanceStatus;
  /** Free-text word from the student, mostly an excuse for "not_going". */
  note?: string;
  /** ISO timestamp of the answer. */
  respondedAt: string;
}

export interface AppEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  /** ISO timestamp. */
  startAt: string;
  /** ISO timestamp, when the event has a known end. */
  endAt?: string;
  location?: EventLocation;
  organizer: string;
  /** Organizer notes, shown as a list on the details page. */
  notes: string[];
  /** What the student needs to bring along. */
  requirements: string[];
  /** Last moment an attendance answer is accepted. */
  rsvpDeadline?: string;
  /** false for events the student doesn't get to opt out of. */
  rsvpEnabled: boolean;
  /** How many students confirmed they are coming. */
  attendingCount: number;
  /** The month whose portion gets recited — only for "recitation" events. */
  relatedMonthId?: string;
  cancelled?: boolean;
  /**
   * The requesting student's own answer, merged in per request and absent
   * until they respond. The event itself is shared by everyone.
   */
  attendance?: EventAttendance;
}
