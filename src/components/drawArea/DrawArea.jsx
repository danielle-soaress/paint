//import './DrawArea.scss';
import {useEffect, useRef, useState} from "react";

function DrawArea() {
    
    const canvasRef = useRef(null);
    const contextRef=useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokeColor, setStrokeColor] = useState('#00000');

    useEffect(()=>{

        const canvas = canvasRef.current;

        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.style.backgroundColor = 'white';
        canvas.style.margin = "0px 30px";

        const context = canvas.getContext("2d");
        context.scale(2,2)
        contextRef.current = context;

        context.lineCap="round";
        context.lineWidth = 5;


        // to change stroke color

            // when a color is chose from color picker
        const colorInput = document.querySelector('#currentColor');
        colorInput.addEventListener('blur', () => {
            setStrokeColor(colorInput.value);
        })

        const lastColors = document.querySelectorAll('.circle')

            // when a color from 'last colors' is picked
        Array.from(lastColors).map( (item) => {
            item.addEventListener ("click", (e) => {
                setStrokeColor(item.getAttribute('color'))
            })
        })


    }, []);

    const startDraw = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const draw = ({nativeEvent}) => {
        if (isDrawing) {
            const {offsetX, offsetY} = nativeEvent;
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.strokeStyle=`${strokeColor}`;
            contextRef.current.stroke();  
        } else {
            return;
        }
    }

    const stopDraw = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    

    return (
        <canvas 
        ref={canvasRef} 
        className="draw_area_container"
        onMouseMove={draw}
        onMouseDown={startDraw}
        onMouseUp={stopDraw}
        />
    )
}

export default DrawArea;