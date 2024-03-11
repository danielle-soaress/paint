import './Shapes.scss'

function Shapes(props) {
    return (
        <div className="shapes_container">
            <i id="circle" className="bi bi-circle"></i>
            <i id="square" className="bi bi-square"></i>
            <i id="triangule" className="bi bi-triangle"></i>
            <i id="arrow" className="bi bi-arrow-up-right"></i>
            <i id="line" className="bi bi-dash-lg"></i>
        </div>
    )
}

export default Shapes;