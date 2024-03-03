import './Circle.scss';

function Circle(props) {

    const circleStyle = {
        width: `${props.radius}`,
        height: `${props.radius}`,
        backgroundColor: `${props.color}`,
        boxShadow: 'inset 1px 1px 5px gray'
    };

    return (
        <span style={circleStyle}></span>
    )
}

export default Circle;