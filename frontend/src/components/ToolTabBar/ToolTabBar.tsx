import React, { useState } from "react";
import "./ToolTabBar.css";

type Tool = { key: string; label: string };
type Group = { key: string; label: string; color: string; tools: Tool[] };

const toolGroups: Group[] = [
  {
    key: "CM", label: "Common Tool (CM)", color: "blue", tools: [
      { key: "xpz2excel", label: "XPZ ➜ Excel" },
      { key: "excel2txt", label: "Excel ➜ TXT" },
    ]
  },
  {
    key: "S", label: "Clear spect Tool (S)", color: "emerald", tools: [
      { key: "mapping", label: "Mapping Item List" },
      { key: "findTable", label: "Tìm bảng và trường tự do" },
    ]
  },
  {
    key: "C", label: "Code Tool (C)", color: "amber", tools: [
      { key: "format", label: "Format Code & Thêm comment" },
      { key: "reviewAI", label: "Review Code với AI" },
    ]
  },
  {
    key: "T", label: "Testing Tool (T)", color: "rose", tools: [
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

  return (
    <div className="flex flex-row gap-3 mb-6 relative">
      {toolGroups.map(group => (
        <div
          key={group.key}
          onMouseEnter={() => setHovered(group.key)}
          onMouseLeave={() => setHovered(null)}
          className="relative"
        >
          <button
            className={`
              px-6 py-2 font-bold rounded-lg border-2
              border-${group.color}-500 text-${group.color}-700
              bg-white hover:bg-${group.color}-50
              shadow transition-all
              focus:outline-none
            `}
            style={{ minWidth: 170 }}
            type="button"
          >
            {group.label}
          </button>
          {hovered === group.key && (
            <div
              className={`
                absolute left-0 top-full mt-2 bg-white border rounded-xl shadow-lg z-30
                min-w-[240px] py-2 animate-fadeIn
              `}
            >
              {group.tools.map(tool => (
                <div
                  key={tool.key}
                  className={`
                    px-5 py-2 cursor-pointer hover:bg-${group.color}-100
                    ${activeTool === tool.key ? `bg-${group.color}-50 text-${group.color}-700 font-semibold` : "text-gray-700"}
                    transition
                  `}
                  onClick={() => onSelectTool(tool.key)}
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
