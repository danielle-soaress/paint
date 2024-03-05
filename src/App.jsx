import { useState } from 'react'
import './App.scss'
import DrawArea from './components/drawArea/DrawArea'
import ToolsArea from './components/toolsArea/ToolsArea'
import logo from './assets/images/logo.png'

function App() {

  return (
    <div className="main_container">
      <img src={logo} alt="" className="logo"></img>
      <DrawArea/>
      <ToolsArea/>
    </div>
  )
}

export default App
