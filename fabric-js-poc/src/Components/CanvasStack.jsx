import React, { useRef, useCallback } from 'react';

const CanvasStack = () =>{

    const useFabric = (onChange) => {
        //console.log("onchange: ", onChange);
        const fabricRef = useRef();
        const disposeRef = useRef();
        return useCallback((node) => {
            console.log(1)
            console.log("node:", node);
            if (node) {
                fabricRef.current = new fabric.Canvas(node);
                if (onChange) {
                    disposeRef.current = onChange(fabricRef.current);
                }
            }
            else if (fabricRef.current) {
                fabricRef.current.dispose();
                if (disposeRef.current) {
                    disposeRef.current();
                    disposeRef.current = undefined;
                }
            }

            const rectangle = new fabric.Rect({
                left: 90,
                top: 50,
                width:100,
                height:30,
                fill:"transparent",
                stroke:"black"
            });

            const rect = new fabric.Rect({
                left: 10,
                top: 50,
                width:40,
                height:100,
                fill:"transparent",
                stroke:"black"
            });
    
            fabricRef.current.add(rectangle, rect);
        }, []);
    };

    const ref = useFabric((fabricCanvas) => {
        console.log("fabric canvas: ", fabricCanvas)
      });
      console.log(3);
      return <div style={{border: '1px solid red'}}>
        <canvas ref={ref} width={200} height={200} />
      </div>
}

export default CanvasStack;