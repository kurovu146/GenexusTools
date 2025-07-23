import { type JSX } from "react";

type NotiType = "success" | "error" | "info" | "warning";

interface NotiProps {
    type?: NotiType;
    message: string;
    detail?: string;
    onClose?: () => void;
}

const ICONS: Record<NotiType, JSX.Element> = {
    success: (
        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#ECFDF5" />
            <path stroke="#22C55E" strokeWidth="2" d="M8 12l3 3 5-5" />
        </svg>
    ),
    error: (
        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#FEE2E2" />
            <path stroke="#EF4444" strokeWidth="2" d="M9 9l6 6m0-6l-6 6" />
        </svg>
    ),
    info: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#DBEAFE" />
            <path stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" d="M12 8h.01" />
            <path stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" d="M12 12v4" />
        </svg>
    ),
    warning: (
        <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24">
            <polygon points="12,3 22,20 2,20" fill="#FEF3C7" />
            <line x1="12" y1="8" x2="12" y2="14" stroke="#F59E42" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17" r="1" fill="#F59E42" />
        </svg>
    )
};

const COLOR: Record<NotiType, string> = {
    success: "border-green-200 bg-green-50",
    error: "border-red-200 bg-red-50",
    info: "border-blue-200 bg-blue-50",
    warning: "border-yellow-200 bg-yellow-50"
};

export default function Notification({
    type = "info",
    message,
    detail,
    onClose
}: NotiProps) {
    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow border ${COLOR[type]} max-w-xl`}
        >
            <div>{ICONS[type]}</div>
            <div className="flex-1">
                <div className="font-semibold text-base">{message}</div>
                {detail && <div className="text-gray-600 text-sm">{detail}</div>}
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-2 text-gray-400 hover:text-gray-700 text-lg px-1"
                    aria-label="Đóng"
                >
                    &times;
                </button>
            )}
        </div>
    );
}
