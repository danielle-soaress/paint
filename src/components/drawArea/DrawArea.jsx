import './DrawArea.scss';
import {useEffect, useRef, useState} from "react";
import { getLastColors, addColors} from '../colors/lastColors';

function DrawArea() {
    
    const canvasRef = useRef(null);
    const contextRef=useRef(null);
    const cursorRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokeColor, setStrokeColor] = useState('#00000');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [lineWidth, setLineWidth] = useState(5)
    const [eraserStyle, setEraserStyle] = useState({
        width: '5px',
        height: '5px',
        backgroundColor: 'black',
        top: '10px',
        left: '10px'
    })

    window.onresize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }




    useEffect(()=>{

        const canvas = canvasRef.current;   
        canvas.width = windowWidth * 2;
        canvas.height = windowHeight * 2;
        canvas.style.width = `${windowWidth}px`;
        canvas.style.height = `${windowHeight}px`;
        canvas.style.backgroundColor = 'white';
        canvas.style.margin = "0px 30px";

        const context = canvas.getContext("2d");
        context.scale(2,2)
        contextRef.current = context;

        context.lineCap="round";
        context.lineWidth = lineWidth;

        // changing to eraser
        const eraser = document.querySelector("#eraser");

        eraser.addEventListener('click', () => {
            setStrokeColor('#ffffff');
        })

        // to change stroke color

            // when a color is chose from color picker
        const colorInput = document.querySelector('#currentColor');
        colorInput.addEventListener('blur', () => {
            setStrokeColor(colorInput.value);
        })

            // when the pencil is selected

                // changing to pencil
        const pencil = document.querySelector("#pencil")

        pencil.addEventListener('click', () => {
            setStrokeColor(colorInput.value);
        })

             // when a color from 'last colors' is picked
        const lastColors = document.querySelectorAll('.circle')
        
        Array.from(lastColors).map( (item) => {
            item.addEventListener ("click", (e) => {
                let elID = e.target.getAttribute('id').substring(1);
                setStrokeColor(getLastColors()[elID])
            })
        })

        // to clear canvas
        const clearEl = document.getElementById("clearCanva");
        clearEl.addEventListener('click', () => {
            context.clearRect(0,0,canvas.width, canvas.height)
        })

        // to change line width
        const thicknessContainer = document.querySelector(".thickness_container");
        const lineWidthEl = document.getElementById("lineWidthEl");

        thicknessContainer.addEventListener('click', () => {
            setLineWidth(lineWidthEl.innerHTML)
        })
        

    }, []);

    const startDraw = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const draw = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        setEraserStyle({
            width: `${lineWidth}px`,
            height:  `${lineWidth}px`,
            backgroundColor: strokeColor,
            top: `${offsetY-lineWidth/2}px`,
            left: `${offsetX-lineWidth/2}px`
        })
        

        if (isDrawing) {
            contextRef.current.lineWidth = lineWidth;
            contextRef.current.strokeStyle=`${strokeColor}`;
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();  
        } else {
            return;
        }
    }

    const stopDraw = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const hideCursor = () => {
        setEraserStyle({
            backgroundColor: 'transparent',
        })
    }


    

    return (
        <>
            <div
            style={eraserStyle} 
            className="custom_cursor"
            useRef={cursorRef}
            ></div>
            <canvas 
            ref={canvasRef} 
            onMouseMove={draw}
            onMouseDown={startDraw}
            onMouseUp={stopDraw}
            onMouseOut={hideCursor}
            style={{cursor: 'none'}}
            />
        </>
    )
}

export default DrawArea;