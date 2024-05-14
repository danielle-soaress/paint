import { useState } from 'react'
import './App.scss'
import DrawArea from './components/drawArea/DrawArea'
import ToolsArea from './components/toolsArea/ToolsArea'
import logo from './assets/images/logo.png'

function App() {

  return (
    <>
    <div className="main_container">
      <img src={logo} alt="" className="logo"></img>
      <DrawArea/>
      <ToolsArea/>
    </div>
    <div className="mobile_advice">
      <img src={logo} alt="" className="logo_advice"></img>
      <p>Este site só está otimizado para dispositivos com tela maior que 720px. 
        Se você está visualizando esta mensagem, pode ser que o seu dispositivo não atenda a esse requisito. 
        Recomendamos acessar o site a partir de um dispositivo com tela maior para uma melhor experiência de usuário. 
        <br/><br/>Obrigado pela compreensão!</p>
    </div>
    </>
  )
}

export default App
