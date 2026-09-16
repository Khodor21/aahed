export type ReviewStatus = "on_track" | "behind" | "not_started" | "completed";

export interface TeacherEvaluation {
  score: number;
  notes?: string;
  teacherName: string;
  date: string;
}

export interface MonthlyReviewSummary {
  id: string;
  monthLabel: string;
  selectedJuz: number[];
  targetPages: number;
  completedPages: number;
  completedDays: number[];
  status: ReviewStatus;
  evaluation?: TeacherEvaluation;
}

export interface Achievement {
  id: string;
  label: string;
  icon: "award" | "book";
}

export interface Student {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  currentMonth: MonthlyReviewSummary | null;
  streakDays: number;
  totalJuzReviewed: number;
  averageScore: number;
  achievements: Achievement[];
  history: MonthlyReviewSummary[];
}
