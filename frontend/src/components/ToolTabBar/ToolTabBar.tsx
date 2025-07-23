import React, { useState } from "react";
import "./ToolTabBar.css";

type Tool = { key: string; label: string };
type Group = { key: string; label: string; color: string; tools: Tool[] };

const toolGroups: Group[] = [
  {
    key: "CM", label: "Common Tool", color: "blue", tools: [
      { key: "xpz2excel", label: "XPZ ➜ Excel" },
      { key: "excel2txt", label: "Excel ➜ TXT" },
    ]
  },
  {
    key: "S", label: "Clear Spec Tool", color: "emerald", tools: [
      { key: "mapping", label: "Mapping Item List" },
      { key: "findTable", label: "Tìm bảng và trường tự do" },
    ]
  },
  {
    key: "C", label: "Code Tool", color: "amber", tools: [
      { key: "format", label: "Format Code & Thêm comment" },
      { key: "reviewAI", label: "Review Code với AI" },
    ]
  },
  {
    key: "T", label: "Testing Tool", color: "rose", tools: [
      { key: "genTest", label: "Generate Test Case với AI" },
    ]
  },
];

interface TabBarProps {
  activeTool: string;
  onSelectTool: (toolKey: string) => void;
}

export const ToolTabBar: React.FC<TabBarProps> = ({ activeTool, onSelectTool }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  // Màu động
  const groupClass = (key: string) => ({
    CM: "border-blue-500 text-blue-700 hover:bg-blue-50",
    S: "border-emerald-500 text-emerald-700 hover:bg-emerald-50",
    C: "border-amber-500 text-amber-700 hover:bg-amber-50",
    T: "border-rose-500 text-rose-700 hover:bg-rose-50",
  }[key] ?? "");

  const itemHoverClass = (key: string) => ({
    CM: "hover:bg-blue-100",
    S: "hover:bg-emerald-100",
    C: "hover:bg-amber-100",
    T: "hover:bg-rose-100",
  }[key] ?? "");

  const itemActiveClass = (key: string) => ({
    CM: "bg-blue-50 text-blue-700 font-semibold",
    S: "bg-emerald-50 text-emerald-700 font-semibold",
    C: "bg-amber-50 text-amber-700 font-semibold",
    T: "bg-rose-50 text-rose-700 font-semibold",
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
