import './Colors.scss';
import Title from '../title/Title.jsx'
import Circle from "../circle/Circle.jsx"


function Colors() {
    const colorsRadius = '30px';
    return (
        <div className="colors_container">
            <div className="last_colors">
                <Circle radius={colorsRadius} color="pink"/>
                <Circle radius={colorsRadius} color="lightyellow"/>
                <Circle radius={colorsRadius} color="lightgreen"/>
                <Circle radius={colorsRadius} color="lightblue"/>
            </div>
            <div className="current_color">
                <Circle radius={colorsRadius} color="#ffff"/>
            </div>
        </div>
    )
}

export default Colors;