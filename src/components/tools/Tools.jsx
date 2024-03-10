import './Tools.scss'

function Tools(props) {

    const toolStyle = {
        fontSize: '12px',
        color: props.color,
    }

    return (
        <div className="tools_container">
            <i id="pencil" className="bi bi-pencil-fill"></i>
            <i id="eraser" className="bi bi-eraser-fill"></i>
            <i id="clearCanva" className="bi bi-x-circle-fill"></i>
        </div>
    )
}

export default Tools;