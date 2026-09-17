"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";

interface LogoutDialogProps {
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function LogoutDialog({ onClose, onConfirm }: LogoutDialogProps) {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleConfirm = async () => {
    setLoggingOut(true);
    await onConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-t-2xl p-4 flex flex-col"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-lightgrey">
          <h2 className="text-sm font-normal text-black">تسجيل الخروج</h2>
          <button type="button" onClick={onClose} className="text-black">
            <FiX size={18} />
          </button>
        </div>

        <p className="text-sm font-light text-black text-center py-4">
          هل أنت متأكد من رغبتك في تسجيل الخروج؟
        </p>

        <div className="flex flex-col space-y-2">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loggingOut}
            className="btn-primary disabled:opacity-50"
          >
            {loggingOut ? "جارٍ تسجيل الخروج..." : "تسجيل الخروج"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loggingOut}
            className="btn-secondary disabled:opacity-50"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
