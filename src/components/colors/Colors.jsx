import './Colors.scss';
import Title from '../title/Title.jsx'
import Circle from "../circle/Circle.jsx"


function Colors() {
    return (
        <div className="colors_container">
            <div className=" current_color">
                <Title title="Current color"/>
                <Circle radius="10px" color="black"/>
            </div>
            <div className="color_cont last_colors">

            </div>
        </div>
    )
}

export default Colors;