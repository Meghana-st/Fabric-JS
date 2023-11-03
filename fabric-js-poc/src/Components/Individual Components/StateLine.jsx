import { useContext, useState, useEffect } from "react";
import FabricContext from "../FabricContext";


const StateLine = () =>{

    const [isDrawing, setIsDrawing] = useState(false);
    const [line, setLine] = useState(null);
    const [firstMouseClick, setFirstMouseClick] = useState(true);
    // const [secondMouseClick, setSecondMouseClick] = useState(false);

    const canvas = useContext(FabricContext);
    
    useEffect(()=>{

        if (!canvas.current) return;
        canvas.current.selection = false;

        canvas.current.on('mouse:down', handleMouseDown);
        canvas.current.on('mouse:move', handleMouseMove);
        canvas.current.on('mouse:up', handleMouseUp);
        
    },[firstMouseClick, isDrawing, line]);

    const handleMouseDown = (options) =>{

        if(firstMouseClick)
        {
            // console.log("first click");
            setIsDrawing(true);
            const pointer = canvas.current.getPointer(options.e);
            
            const newLine = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
                id : "added-line",
                stroke: 'black',
                //strokeWidth : 1,
                //selectable: false,
            });
            // console.log("First set of points: ", newLine);
            setLine(newLine);
            canvas.current.add(newLine);
        }
        else
        {
            // canvas.current.add(line);
            setIsDrawing(false);
            setLine(null);
        }
       
    }

    const handleMouseMove = (options) =>{

        if(isDrawing)
        {
            const pointer = canvas.current.getPointer(options.e);
            // console.log("Second set of points: ", pointer);
            if(line)
            {
                line.set({x2: pointer.x, y2:pointer.y});
                canvas.current.renderAll();
            }
        }
    }

    const handleMouseUp = (options) =>{
        //canvas.current.add(line);
        // setIsDrawing(false);
        // setLine(null);
        if(firstMouseClick)
        {
            console.log("first click");
            setFirstMouseClick(false);
        }
        else
        {
            console.log("second click");
            setFirstMouseClick(true);
        }
        //console.log(firstMouseClick);
    }
    return null;
}

export default StateLine;