import React, { useState } from "react";
import "./ToolTabBar.css";

type Tool = { key: string; label: string };
type Group = { key: string; label: string; color: string; tools: Tool[] };

const toolGroups: Group[] = [
    {
        key: "extract",
        label: "Phân tích & Trích xuất",
        color: "blue",
        tools: [
            { key: "mappingItem", label: "Mapping Item List" },
            { key: "extractAllSource", label: "Extract All Source" },
            { key: "viewSDTFromXPZ", label: "Phân tích Source" },
            { key: "viewAllVars", label: "Xem tất cả biến" },
        ]
    },
    {
        key: "format",
        label: "Xử lý/Chuyển đổi/Định dạng File",
        color: "emerald",
        tools: [
            { key: "xpz2excel", label: "XPZ ➜ Excel" },
            { key: "excel2txt", label: "Excel ➜ TXT" },
            { key: "formatCode", label: "Format Code & Thêm comment" },
            { key: "renameXPZ", label: "Đổi tên file XPZ" },
        ]
    },
    {
        key: "qa",
        label: "Kiểm tra, Gán biến, QA, Review",
        color: "amber",
        tools: [
            { key: "qnaAI", label: "Q&A với AI" },
            { key: "screenItemCheck", label: "Kiểm tra item màn hình (画面)" },
            { key: "fieldAssignCheck", label: "Kiểm tra gán trường" },
            { key: "reviewCodeAI", label: "Review Code với AI" },
            { key: "genTestCaseAI", label: "Generate Test Case với AI" },
            { key: "assignField", label: "🧩 Gán Trường" },
            { key: "unusedVarCheck", label: "♻️ Kiểm tra biến thừa" },
            { key: "explainSpec", label: "📄 Dán Spec cần giải thích" },
            { key: "explainAndSuggestAI", label: "🧠 Giải thích Spec và gợi ý code" }
        ]
    },
    {
        key: "automation",
        label: "Dịch thuật & Sinh code/SDT tự động",
        color: "rose",
        tools: [
            { key: "translate", label: "Dịch thuật" },
            { key: "genCodeFromSpec", label: "Generate Code từ Spec với AI" },
            { key: "explainAndSuggestAI", label: "🧠 Giải thích Spec và gợi ý code" },
            { key: "createSDT", label: "Tạo SDT" },
        ]
    },
    {
        key: "search",
        label: "Tìm kiếm & Thống kê",
        color: "cyan",
        tools: [
            { key: "searchAll", label: "🔍 Search All" },
            { key: "findTableField", label: "🔍 Tìm bảng và trường tự do" },
            { key: "statistical", label: "📊 Thống kê" },
        ]
    }
];

interface TabBarProps {
    activeTool: string;
    onSelectTool: (toolKey: string) => void;
}

export const ToolTabBar: React.FC<TabBarProps> = ({ activeTool, onSelectTool }) => {
    const [hovered, setHovered] = useState<string | null>(null);

    // Màu động cho border, text, hover-bg nút chính
    const groupClass = (key: string) => ({
        extract: "border-blue-500 text-blue-700 hover:bg-blue-50",
        format: "border-emerald-500 text-emerald-700 hover:bg-emerald-50",
        qa: "border-amber-500 text-amber-700 hover:bg-amber-50",
        automation: "border-rose-500 text-rose-700 hover:bg-rose-50",
        search: "border-cyan-500 text-cyan-700 hover:bg-cyan-50",
    }[key] ?? "");

    // Hover item trong dropdown
    const itemHoverClass = (key: string) => ({
        extract: "hover:bg-blue-100",
        format: "hover:bg-emerald-100",
        qa: "hover:bg-amber-100",
        automation: "hover:bg-rose-100",
        search: "hover:bg-cyan-100",
    }[key] ?? "");

    // Item đang active
    const itemActiveClass = (key: string) => ({
        extract: "bg-blue-50 text-blue-700 font-semibold",
        format: "bg-emerald-50 text-emerald-700 font-semibold",
        qa: "bg-amber-50 text-amber-700 font-semibold",
        automation: "bg-rose-50 text-rose-700 font-semibold",
        search: "bg-cyan-50 text-cyan-700 font-semibold",
    }[key] ?? "");


    return (
        <div className="flex flex-row gap-3 mb-6 relative">
            {toolGroups.map(group => (
                <div
                    key={group.key}
                    className="relative"
                    onMouseEnter={() => setHovered(group.key)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <button
                        className={`px-6 py-2 font-bold rounded-lg border-2 shadow transition-all focus:outline-none min-w-[170px] cursor-pointer ${groupClass(group.key)}`}
                        type="button"
                    >
                        {group.label}
                    </button>
                    {hovered === group.key && (
                        <div
                            className={`
                                absolute left-0 top-full bg-white rounded-xl shadow-2xl z-30
                                min-w-[240px] py-2
                            `}
                        >
                            {group.tools.map(tool => (
                                <div
                                    key={tool.key}
                                    className={`
                                        px-5 py-2 cursor-pointer transition
                                        ${itemHoverClass(group.key)}
                                        ${activeTool === tool.key ? itemActiveClass(group.key) : "text-gray-700"}
                                        hover:shadow
                                        rounded-lg
                                    `}
                                    onClick={() => {
                                        onSelectTool(tool.key);
                                        setHovered(null);
                                    }}
                                >
                                    {tool.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
