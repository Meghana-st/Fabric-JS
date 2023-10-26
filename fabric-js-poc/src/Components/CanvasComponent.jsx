import { useEffect, useRef } from "react";
import {fabric} from "fabric";

const CanvasComponent = () => {

    const canvasRef = useRef(null);

    useEffect(()=>{
        const newCanvas = new fabric.Canvas(canvasRef.current,{
                selection: false,
            
        });

        const rectangle = new fabric.Rect({
            left: 100,
            top: 50,
            width:100,
            height:30,
            fill:"transparent",
            stroke:"black"
        });

        newCanvas.add(rectangle);

    },[]);

    return(
        <canvas
            ref={canvasRef}
            style={{border:"2px solid black"}}
        ></canvas>
    )

}

export default CanvasComponent;