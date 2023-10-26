import { useContext, useEffect, useState } from "react";
import FabricContext from "../FabricContext";


const AsyncLine = () =>{

    const canvas = useContext(FabricContext);
    const [isDrawing, setIsDrawing] = useState(false);
    let line;

    const handleMouseDown = async (options) =>{
       
        setIsDrawing(true);
        const pointer = canvas.current.getPointer(options.e);
        line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
            id : "added-line",
            stroke: 'black',
            //strokeWidth : 1,
            //selectable: false,
          });
        //setLine(newLine);
        canvas.current.add(line);
    }

    const handleMouseMove = async(options) =>{
        if(isDrawing)
        {
            const pointer = canvas.current.getPointer(options.e);
            //setPoints((prevPoints) =>{[...prevPoints, pointer.x,pointer.y]});
            await line.set({x2: pointer.x, y2:pointer.y});
            await canvas.current.renderAll();
            //setLine((prevLine)=>{return{...prevLine, p}});
        }
    }

    const handleMouseUp = async(options) =>{
        //canvas.current.add(line);
        await setIsDrawing(false);
    }

    useEffect(()=>{

        if (!canvas.current) return;
        canvas.current.selection = false;

        canvas.current.on('mouse:down', handleMouseDown);
        canvas.current.on('mouse:move', handleMouseMove);
        canvas.current.on('mouse:up', handleMouseUp);

    },[]);

    
}

export default AsyncLine;