import './Tools.scss'

function Tools(props) {

    const toolStyle = {
        fontSize: '12px',
        color: props.color,
    }

    return (
        <div className="tools_container">
            <i class="bi bi-pencil-fill"></i>
            <i class="bi bi-eraser-fill"></i>
            <i class="bi bi-x-circle-fill"></i>
        </div>
    )
}

export default Tools;