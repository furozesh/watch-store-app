"use client";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "حذف",
  cancelText = "انصراف",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5">

      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

        <h2 className="text-xl font-bold text-[#1b3a6b]">
          {title}
        </h2>

        <p className="mt-3 text-slate-500 leading-7">
          {description}
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="h-11 rounded-xl border border-slate-200 px-5 hover:bg-slate-50"
          >
            {cancelText}
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="h-11 rounded-xl bg-red-500 px-5 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? "..." : confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}