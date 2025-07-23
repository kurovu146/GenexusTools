import { useState } from 'react'
import './App.css'
import { ToolTabBar } from './components/ToolTabBar/ToolTabBar'

function App() {
  const [activeTool, setActiveTool] = useState<string>("")

  return (
    <>
      <ToolTabBar activeTool={activeTool} onSelectTool={setActiveTool} />
    </>
  )
}

export default App
