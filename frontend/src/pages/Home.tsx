import React, { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToolTabBar } from "../components/ToolTabBar/ToolTabBar";
import XPZ2ExcelTool from "../features/XPZ2ExcelTool/XPZ2ExcelTool";
import Loading from "../components/Loading/Loading";
const Excel2TxtTool = React.lazy(() => import("../features/Excel2TxtTool/Excel2TxtTool"));

const renderToolContent = (tool: string) => {
  switch (tool) {
    case "xpz2excel":
      return <XPZ2ExcelTool />;
    case "excel2txt":
      return <Excel2TxtTool />;
    default:
      return <XPZ2ExcelTool />;
  }
};

export default function Home() {
  const [activeTool, setActiveTool] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-50 p-8" style={{ width: '1200px' }}>
      <h1 className="text-2xl font-bold mb-6 text-left" style={{ color: '#1884FF' }}>Genexus Tools</h1>
      <ToolTabBar activeTool={activeTool} onSelectTool={setActiveTool} />
      <span className="neon-text flex items-center gap-1">
        <svg className="w-5 h-5 inline-block text-cyan-400" />
        📄 Hướng dẫn sử dụng
      </span>
      <div className="bg-white p-6 rounded-xl mt-4 shadow-lg min-h-[320px] transition-all duration-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {
              <Suspense fallback={<Loading />}>
                {renderToolContent(activeTool)}
              </Suspense>
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
