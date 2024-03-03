import { useState } from 'react'
import './App.scss'
import DrawArea from './components/drawArea/DrawArea'
import ToolsArea from './components/toolsArea/ToolsArea'

function App() {

  return (
    <div className="main_container">
      <DrawArea/>
      <ToolsArea/>
    </div>
  )
}

export default App
