import './DrawArea.scss';
import {useEffect, useRef, useState} from "react";
import { getLastColors, addColors} from '../../appData.jsx';

function DrawArea() {
    
    const canvasRef = useRef(null);
    const contextRef=useRef(null);
    const cursorRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokeColor, setStrokeColor] = useState('#00000');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [lineWidth, setLineWidth] = useState(5)
    
    const [drawFig, setDrawFig] = useState(false);
    const [fig, setFig] = useState(null);
    const [figCoords, setFigCoords] = useState([]); // [startX, startY]

    const [brushStyle, setBrushStyle] = useState({
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
            setDrawFig(false)
            pencil.style.color = "#69C0FF";
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
            setStrokeColor(colorInput.value);
        })

        // selecting the shapes

        const squareEl = document.getElementById('square')
        
        squareEl.addEventListener("click", () => {
            setDrawFig(true)
            setFig('square')
            pencil.style.color = "black";
            eraser.style.color = "black";
        })
        

    }, []);

    const startDraw = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)

        if (drawFig) {
            canvasRef.current.style.cursor = "crosshair"
            setFigCoords([offsetX, offsetY]);
        }
    }

    const draw = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        setBrushStyle({
            width: `${lineWidth}px`,
            height:  `${lineWidth}px`,
            backgroundColor: strokeColor,
            top: `${offsetY-lineWidth/2}px`,
            left: `${offsetX-lineWidth/2}px`
        })

        if (!drawFig) {
            if (isDrawing) {
                contextRef.current.lineWidth = lineWidth;
                contextRef.current.strokeStyle=`${strokeColor}`;
                contextRef.current.lineTo(offsetX, offsetY);
                contextRef.current.stroke();  
            } else {
                return;
            }
        }

    }

    const stopDraw = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;

        contextRef.current.closePath();
        setIsDrawing(false);

        if (drawFig) {
            let startCoords = figCoords
            let endYCoord = -(startCoords[1]-offsetY);
            let endXCoord = -(startCoords[0]-offsetX);
            

            switch (fig) {
                case "square":
                    drawRect(startCoords [0], startCoords[1], endXCoord, endYCoord)
                    break;
            }
            canvasRef.current.style.cursor = "none"
        }
    }

    const hideCursor = () => {
        setBrushStyle({
            bacgkroundColor: 'transparent',
        })
    }

    // function to draw a rect

    const drawRect = (x,y, width, height) => {
        contextRef.current.beginPath();
        contextRef.current.rect(x, y, width, height);
        contextRef.current.lineWidth = 7;
        contextRef.current.strokeStyle = `${strokeColor}`
        contextRef.current.stroke();
    }


    

    return (
        <>
            <div
            style={brushStyle} 
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