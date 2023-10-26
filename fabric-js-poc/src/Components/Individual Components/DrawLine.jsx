import { useCallback, useContext, useEffect, useState } from "react";
import FabricContext from "../FabricContext";


const DrawLine = () =>{
    const canvas = useContext(FabricContext);
    //const [isDrawing, setIsDrawing] = useState(false);
    //const [line, setLine] = useState(null);
    //const [points, setPoints] = useState([]);
    let isDrawing;
    let line;

    const handleMouseDown = (options) =>{
       
        isDrawing=true;
        const pointer = canvas.current.getPointer(options.e);
        //setPoints([pointer.x, pointer.y])
        line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
            id : "added-line",
            stroke: 'black',
            //strokeWidth : 1,
            //selectable: false,
          });
        //setLine(newLine);
        canvas.current.add(line);
    }

    const handleMouseMove = (options) =>{
        if(isDrawing)
        {
            const pointer = canvas.current.getPointer(options.e);
            //setPoints((prevPoints) =>{[...prevPoints, pointer.x,pointer.y]});
            line.set({x2: pointer.x, y2:pointer.y});
            canvas.current.renderAll();
            //setLine((prevLine)=>{return{...prevLine, p}});
        }
    }

    const handleMouseUp = (options) =>{
        //canvas.current.add(line);
        isDrawing=false;
    }

    useEffect(()=>{

        if (!canvas.current) return;
        canvas.current.selection = false;

        canvas.current.on('mouse:down', handleMouseDown);
        canvas.current.on('mouse:move', handleMouseMove);
        canvas.current.on('mouse:up', handleMouseUp);
        
    },[]);

    const deactivateDrawing = () =>{
    
        console.log("deactivate", isDrawing, line);
        canvas.current.off('mouse:down', handleMouseDown);
        canvas.current.off('mouse:move', handleMouseMove);
        canvas.current.off('mouse:up', handleMouseUp);

        canvas.current.getObjects().forEach(obj => {
            if(obj.id === "added-line")
            {
                obj.set({selectable:true});
                console.log(obj);
            }
        });
    }

    return(<button onClick={deactivateDrawing}>Deactivate</button>)
}

export default DrawLine;