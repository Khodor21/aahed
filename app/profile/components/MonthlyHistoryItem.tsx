"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import type { MonthlyReviewSummary } from "@/lib/types/student";
import { formatSelectedJuzLabel } from "@/lib/juz";

interface MonthlyHistoryItemProps {
  review: MonthlyReviewSummary;
}

export default function MonthlyHistoryItem({ review }: MonthlyHistoryItemProps) {
  const [expanded, setExpanded] = useState(false);
  const hasEvaluation = Boolean(review.evaluation);

  return (
    <div className="border border-lightgrey rounded-md p-3">
      <button
        type="button"
        onClick={() => hasEvaluation && setExpanded((prev) => !prev)}
        className="flex items-center justify-between w-full text-right"
      >
        <span className="flex flex-col items-start">
          <span className="text-sm font-normal text-black">{review.monthLabel}</span>
          <span className="text-xs font-light text-main">
            {formatSelectedJuzLabel(review.selectedJuz)}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-sm font-normal text-black">
            {review.completedPages}/{review.targetPages} صفحة
          </span>
          {review.evaluation && (
            <span className="text-xs font-normal text-main">
              {review.evaluation.score}/10
            </span>
          )}
          {hasEvaluation && (
            <FiChevronDown
              size={16}
              className={`text-black transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          )}
        </span>
      </button>
      {expanded && review.evaluation && (
        <div className="mt-2 space-y-1">
          <p className="text-xs font-normal text-black">
            المعلّم: {review.evaluation.teacherName}
          </p>
          {review.evaluation.notes && (
            <p className="text-xs font-light text-black leading-relaxed">
              <span className="font-normal">ملاحظات المعلّم: </span>
              {review.evaluation.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
