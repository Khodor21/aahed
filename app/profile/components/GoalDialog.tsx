"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { JUZ_LIST, PAGES_PER_JUZ } from "@/lib/juz";

interface GoalDialogProps {
  onClose: () => void;
  studentName: string;
  studentRole: string;
  avatarInitials: string;
  initialSelectedJuz: number[];
  onSave: (selectedJuz: number[]) => Promise<void>;
}

export default function GoalDialog({
  onClose,
  studentName,
  studentRole,
  avatarInitials,
  initialSelectedJuz,
  onSave,
}: GoalDialogProps) {
  const [selected, setSelected] = useState<number[]>(initialSelectedJuz);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (juzNumber: number) => {
    setSelected((prev) =>
      prev.includes(juzNumber)
        ? prev.filter((n) => n !== juzNumber)
        : [...prev, juzNumber],
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSave(selected);
    } catch {
      setError("حدث خطأ أثناء الحفظ، حاول مرة أخرى");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-t-2xl p-4 max-h-[85vh] flex flex-col"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-lightgrey">
          <h2 className="text-sm font-normal text-black">تحديد هدف الشهر</h2>
          <button type="button" onClick={onClose} className="text-black">
            <FiX size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3 py-3 border-b border-lightgrey">
          <div className="w-10 h-10 rounded-full bg-main text-white flex items-center justify-center text-sm font-light shrink-0">
            {avatarInitials}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-normal text-black">
              {studentName}
            </span>
            <span className="text-xs font-light text-black">{studentRole}</span>
          </div>
        </div>

        <p className="text-xs font-light text-black pt-3">
          اختر جزءاً واحداً على الأقل من أجزاء القرآن الكريم لمراجعته هذا الشهر
        </p>

        <div className="flex-1 overflow-y-auto py-2">
          {JUZ_LIST.map(({ number, label }) => (
            <label
              key={number}
              className="flex items-center justify-between py-2 border-b border-lightgrey last:border-none"
            >
              <span className="text-sm font-light text-black">{label}</span>
              <input
                type="checkbox"
                checked={selected.includes(number)}
                onChange={() => toggle(number)}
                className="w-4 h-4 accent-main"
              />
            </label>
          ))}
        </div>

        <div className="pt-3 border-t border-lightgrey flex flex-col space-y-2">
          <span className="text-xs font-light text-black text-center">
            {selected.length} جزء محدد · {selected.length * PAGES_PER_JUZ} صفحة
          </span>
          {error && (
            <span className="text-xs font-normal text-main text-center">
              {error}
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={selected.length === 0 || saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? "جارٍ الحفظ..." : "حفظ الهدف"}
          </button>
          <button type="button" onClick={onClose} className="btn-secondary">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
