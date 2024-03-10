import './Colors.scss';
import Title from '../title/Title.jsx'
import Circle from "../circle/Circle.jsx"
import {useRef, useEffect, useState} from 'react'


function Colors() {
    const colorsRadius = '30px';
    const inputColorRef = useRef(null);
    const [lastColors, setLastColors] = useState(['#ffc0cb','#90ee90', '#ffffe0', '#add8e6']);
    
    const color1 = useRef(null)
    const color2 = useRef(null)
    const color3 = useRef(null)
    const color4 = useRef(null)
    
    const changeColor = (e) => { // this function add the selected color to the "last colors" area.
        let newArr = lastColors;
        newArr.unshift(e.target.value);

        if (newArr.length==8) {
            for (let i = 0; i<4; i++) {
                newArr.pop();
            }
        }

        setLastColors(newArr);
        
        color1.current.style.backgroundColor = `${newArr[0]}`;
        color2.current.style.backgroundColor = `${newArr[1]}`;
        color3.current.style.backgroundColor = `${newArr[2]}`;
        color4.current.style.backgroundColor = `${newArr[3]}`;

    }

    const selectColor = (e) => {
        let targetNumber = e.target.getAttribute('id').substring(1);
        console.log(lastColors[targetNumber])
        inputColorRef.current.value = lastColors[targetNumber];
    }


    return (
        <div className="colors_container">
            <div data={lastColors} className="last_colors">
                <span ref={color1} id="c0" color={lastColors[0]} className="circle" onClick={selectColor} style={{backgroundColor: "pink"}}></span>
                <span ref={color2} id="c1" color={lastColors[1]} className="circle" onClick={selectColor} style={{backgroundColor: "lightgreen"}}></span>
                <span ref={color3} id="c2" color={lastColors[2]} className="circle" onClick={selectColor} style={{backgroundColor: "lightyellow"}}></span>
                <span ref={color4} id="c3" color={lastColors[3]} className="circle" onClick={selectColor} style={{backgroundColor: "lightblue"}}></span>
            </div>
            <div className="current_color">
                <input ref={inputColorRef} onBlur={changeColor} type="color" id="currentColor"/>
            </div>
        </div>
    )
}

export default Colors;