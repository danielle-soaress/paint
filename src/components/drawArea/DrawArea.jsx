import './DrawArea.scss';
import {useEffect, useRef} from "react";

function DrawArea() {
    
    const canvasRef = useRef();

    console.log(canvasRef);

    useEffect(()=>{
        const context = canvasRef.current.getContext("2d");
    }, []);

    return (
        <canvas ref={canvasRef} className="draw_area_container"/>
    )
}

export default DrawArea;