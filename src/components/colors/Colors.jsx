import './Colors.scss';
import {useRef, useState} from 'react'
import {getLastColors, addColors} from '../../appData.jsx';

function Colors() {
    const inputColorRef = useRef(null);
    const [colors, setColors] = useState(getLastColors())
    
    const color1 = useRef(null)
    const color2 = useRef(null)
    const color3 = useRef(null)
    const color4 = useRef(null)
    
    const changeColor = (e) => { // this function add the selected color to the "last colors" array
        addColors(e.target.value)

        let lastColors = getLastColors();
        
        color1.current.style.backgroundColor = `${lastColors[0]}`;
        color2.current.style.backgroundColor = `${lastColors[1]}`;
        color3.current.style.backgroundColor = `${lastColors[2]}`;
        color4.current.style.backgroundColor = `${lastColors[3]}`;

        setColors(lastColors)

    }
    
    const selectColor = (e) => {
        let targetNumber = e.target.getAttribute('id').substring(1);
        inputColorRef.current.value = colors[targetNumber];
    }

    return (
        <div className="colors_container">
            <div data={colors} className="last_colors">
                <span ref={color1} id="c0" color={colors[0]} className="circle" onClick={selectColor} style={{backgroundColor: "pink"}}></span>
                <span ref={color2} id="c1" color={colors[1]} className="circle" onClick={selectColor} style={{backgroundColor: "lightgreen"}}></span>
                <span ref={color3} id="c2" color={colors[2]} className="circle" onClick={selectColor} style={{backgroundColor: "lightyellow"}}></span>
                <span ref={color4} id="c3" color={colors[3]} className="circle" onClick={selectColor} style={{backgroundColor: "lightblue"}}></span>
            </div>
            <div className="current_color">
                <input ref={inputColorRef} onBlur={changeColor} type="color" id="currentColor"/>
            </div>
        </div>
    )
}

export default Colors;