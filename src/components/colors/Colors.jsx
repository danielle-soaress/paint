import './Colors.scss';
import Title from '../title/Title.jsx'
import Circle from "../circle/Circle.jsx"
import {useRef, useEffect, useState} from 'react'


function Colors() {
    const colorsRadius = '30px';
    const currentColorRef = useRef(null);
    const inputColorRef = useRef(null);
    const [color, setColor] = useState('#ffffff')


    useEffect(() => {
        setColor(inputColorRef.current.value);
        console.log(color)
    }, [])
    





    return (
        <div className="colors_container">
            <div className="last_colors">
                <Circle radius={colorsRadius} color="pink"/>
                <Circle radius={colorsRadius} color="lightyellow"/>
                <Circle radius={colorsRadius} color="lightgreen"/>
                <Circle radius={colorsRadius} color="lightblue"/>
            </div>
            <div className="current_color">
                <input ref={inputColorRef} type="color" id="currentColor"/>
            </div>
        </div>
    )
}

export default Colors;