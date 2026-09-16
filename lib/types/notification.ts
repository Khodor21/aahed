/** "reminder" and "evaluation" are personal; "event" and "announcement" are general. */
export type NotificationType =
  | "reminder"
  | "evaluation"
  | "event"
  | "announcement";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  /** ISO timestamp. */
  createdAt: string;
  read: boolean;
  /** In-app destination the notification is about, when it has one. */
  href?: string;
}
