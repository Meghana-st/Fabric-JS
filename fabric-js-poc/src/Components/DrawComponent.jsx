import React,{ useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawComponent = () =>{

  const canvas = useContext(FabricContext);
  const [isDrawing, setIsDrawing] = useState(false);
  const [line, setLine] = useState(null);

  useEffect(() => {
    if (!canvas.current) return;

    canvas.current.on('mouse:down', function (options) {
      console.log('down');
      const pointer = canvas.current.getPointer(options.e);
      setIsDrawing(true);
      const newLine = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        stroke: 'black',
      });
      canvas.current.add(newLine);
      setLine(newLine);
    });

    canvas.current.on('mouse:move', function (options) {
      if (isDrawing) {
        const pointer = canvas.current.getPointer(options.e);
        line.set({ x2: pointer.x, y2: pointer.y });
        canvas.current.renderAll();
      }
    });

    canvas.current.on('mouse:up', function () {
      console.log('up');
      setIsDrawing(false);
    });
    console.log("line", line);
  }, [canvas, isDrawing, line]);

  return null; // S
    // setTimeout(()=>{

    // canvas.current?.on('mouse:down', function(options) {
    //     console.log("down");
    //     const pointer = canvas.current?.getPointer();
    //     console.log(canvas.current?.getPointer().x);
    //     setIsDrawing(true);
    //     setLine(new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y]),{
    //         stroke:"black"
    //     });
    //     //console.log(options.e.layerX, options.e.layerY);
    //   });
    // //   console.log("line", line);
    // canvas.current?.on('mouse:move', (options)=>{
    //     console.log("moving");
    //     if(isDrawing === true)
    //     {
    //         const pointer = canvas.current?.getPointer();
    //         setLine({...line, x2:pointer.x, y2:pointer.y});
    //     }
    // });

    // canvas.current?.on('mouse:up', (options)=>{
    //     console.log("up");
    //     canvas.current?.add(line);
    //     setIsDrawing(false);
    // });

    // },5000);

}

export default DrawComponent;