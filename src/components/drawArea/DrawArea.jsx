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

        const shapes = document.querySelectorAll('.shape')

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
            deselectShapes()
            setDrawFig(false)
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
            deselectShapes()
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
        
        // circle 
        shapes[0].addEventListener("click", () => {
            setDrawFig(true)
            setFig('circle')

            selectShape(0)
            pencil.style.color = "black";
            eraser.style.color = "black";
        })

        // square
        shapes[1].addEventListener("click", () => {
            setDrawFig(true)
            setFig('square')
            selectShape(1)
            pencil.style.color = "black";
            eraser.style.color = "black";
        })

        //triangule
        shapes[2].addEventListener("click", () => {
            setDrawFig(true)
            setFig('triangule')
            selectShape(2)
            pencil.style.color = "black";
            eraser.style.color = "black";
        })
        
        //line
        shapes[3].addEventListener("click", () => {
            setDrawFig(true)
            setFig('line')
            selectShape(3)
            pencil.style.color = "black";
            eraser.style.color = "black";
        })

        function selectShape(index) {
            deselectShapes()
            shapes[index].style.color = "#69C0FF"
        }

        function deselectShapes() {
            for (let i = 0; i<shapes.length; i++) {
                shapes[i].style.color = "black"
            }
        }
        

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
            let widthY = -(startCoords[1]-offsetY);
            let widthX = -(startCoords[0]-offsetX);
            let radius = Math.sqrt(widthX**2+widthY**2)

            switch (fig) {
                case "square":
                    drawRect(startCoords [0], startCoords[1], widthX, widthY)
                    break;
                case "line":
                    drawLine(startCoords [0], startCoords[1], offsetX, offsetY)
                    break;
                case "circle":
                    drawCircle(startCoords[0], startCoords[1], radius);
                    break;
                case "triangule":
                    drawTriangule(startCoords [0], startCoords[1], offsetX, offsetY)
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
        contextRef.current.lineWidth = lineWidth;
        contextRef.current.strokeStyle = `${strokeColor}`
        contextRef.current.stroke();
    }

    // function to draw a line

    const drawLine = (xStart, yStart, xEnd, yEnd) => {
        contextRef.current.beginPath();
        contextRef.current.moveTo(xStart,yStart);
        contextRef.current.lineWidth = lineWidth;
        contextRef.current.lineTo(xEnd, yEnd);
        contextRef.current.stroke();
    }
    
    // function to draw a circle

    const drawCircle = (centerX, centerY, radius) => {
        contextRef.current.beginPath();
        contextRef.current.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        contextRef.current.lineWidth = lineWidth;
        contextRef.current.strokeStyle= `${strokeColor}`;
        contextRef.current.stroke();
    }

    const drawTriangule = (xStart, yStart, xEnd, yEnd) => {
        contextRef.current.beginPath();
        contextRef.current.moveTo(xStart,yStart);
        contextRef.current.lineTo(xEnd, yEnd);
        contextRef.current.lineTo(xEnd, yStart);
        contextRef.current.lineTo(xStart,yStart);
        contextRef.current.lineWidth = lineWidth;
        contextRef.current.strokeStyle= `${strokeColor}`;
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