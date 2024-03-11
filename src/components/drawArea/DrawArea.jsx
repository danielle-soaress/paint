//import './DrawArea.scss';
import {useEffect, useRef, useState} from "react";

function DrawArea() {
    
    const canvasRef = useRef(null);
    const contextRef=useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokeColor, setStrokeColor] = useState('#00000');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [lineWidth, setLineWidth] = useState(5)

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
                let father = e.target.parentElement.getAttribute('data').split(',');
                let targetNumber = e.target.getAttribute('id').substring(1);
                setStrokeColor(father[targetNumber])

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
        if (isDrawing) {
            const {offsetX, offsetY} = nativeEvent;
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