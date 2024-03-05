

function Circle(props) {

    const circleStyle = {
        width: props.radius,
        height: props.radius,
        backgroundColor: props.color,
        borderRadius: props.radius,
        border: '0.5px black solid'
    };

    return (
        <div style={circleStyle}></div>
    )
}

export default Circle;