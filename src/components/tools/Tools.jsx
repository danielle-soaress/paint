import './Tools.scss'
import {useState} from 'react'

function Tools(props) {

    const [selectedTool, setSelectedTool] = useState(1)

    const toolStyle = {
        fontSize: '12px',
        color: props.color,
    }

    const selectedStyle = {
        color: '#69C0FF'
    }

    return (
        <div className="tools_container">
            <i onClick={() => setSelectedTool(1)} style={selectedTool == 1 ? selectedStyle : null } id="pencil" className="bi bi-pencil-fill"></i>
            <i onClick={() => setSelectedTool(2)} style={selectedTool == 2 ? selectedStyle : null } id="eraser" className="bi bi-eraser-fill"></i>
            <i onClick={() => setSelectedTool(3)} id="clearCanva" className="bi bi-x-circle-fill"></i>
        </div>
    )
}

export default Tools;