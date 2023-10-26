import React,{ useRef, useCallback, useContext } from "react";
import FabricContext from "./FabricContext";


const useFabric = () => {
    //const canvas = useRef(null);
    const canvas = useContext(FabricContext);
    const fabricRef = useCallback((element) => {
      if (!element) return canvas.current?.dispose();
  
      canvas.current = new fabric.Canvas(element);
      canvas.current.add(new fabric.Rect(
        {top: 100, left: 110, width: 100, height: 100, fill: 'transparent', stroke:'black'}
      ));
      canvas.current.add(new fabric.Rect(
        {top: 100, left: 300, width: 100, height: 100, fill: 'transparent', stroke:'black'}
      ));
      canvas.current.add(new fabric.Circle({
        left: 80,
        top: 10,
        fill : "transparent",
        stroke : "black",
        radius : 30
      }));
      canvas.current.add(new fabric.Triangle({
        left: 240,
        top: 10,
        fill : "transparent",
        stroke : "black",
        width: 50,
        height: 50
      }));
      canvas.current.add(new fabric.Ellipse({
        left: 80,
        top: 280,
        fill : "transparent",
        stroke : "black",
        rx: 50,
        ry:30,
        //lockMovementX : true
      }));
      canvas.current.add(new fabric.Polyline([{x:10,y:180},{x:80,y:160},{x:100,y:190}], {
        fill : "transparent",
        stroke: 'black',
        strokeWidth: 2,
    }));
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return fabricRef;
  };

  function MyFabric() {
    const fabricRef = useFabric();
    return (<canvas ref={fabricRef} width={640} height={360} style={{border: '1px solid black'}}/>);
  }

  export default MyFabric;