import React,{ useRef,useEffect, useCallback, useContext } from "react";
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
    const point = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 1,   // Small radius to make it look like a point
      fill: 'black', 
    });

  const polygon = new fabric.Polygon([
      { x: 90, y: 30 },   
      { x: 0, y: 70 },   
      { x: 40, y: 160 }, 
      { x: 140, y: 160 }, 
      { x: 180, y: 70 }, 
    ],{
      left: 420,
      top: 40,
      flipY: true,
      // scaleX: 2,
      // scaleY: 2,
      stroke:'black',
      fill:'transparent'
   })
   const arc = new fabric.Path("M 255 135 A 50 50 0 0 1 200 110", {
      top: 150,
      left: 220,
      stroke: 'black',
      fill: "transparent"
  });

  const spline = new fabric.Path('M 50 100 C 100 0 200 200 300 100', {
      top:280,
      left:300,
      fill: 'transparent',
      stroke: 'black',     
    });

    const line = new fabric.Line([350, 300, 300, 350], {
      id : "added-line",
      stroke: 'black',
      //strokeWidth : 1,
      //selectable: false,
  });
  
  //  canvas.current.arc(100, 75, 50, 135, 2 * Math.PI);

  //  const point = new fabric.Point({x:150,y:150});

  // canvas.current.beginPath();
  // canvas.current.arc(100, 100, 50, 0, Math.PI, false);
  // canvas.current.strokeStyle = 'red';  // Color of the arc's stroke
  // canvas.current.lineWidth = 2;       // Width of the stroke
  // canvas.current.stroke();          

   canvas.current.add(point, polygon, arc, spline, line);
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return fabricRef;
  };

  function MyFabric() {
    const fabricRef = useFabric();

    const canvas = useContext(FabricContext);
    let _clipboard;
    // useEffect(()=>{

    //     if (!canvas.current) return;
    //     canvas.current.selection = false;
    //   },[canvas]);

      setTimeout(()=>{
        console.log(canvas);
      },5000)

    const onCopyObject = () =>{
      canvas.current.getActiveObject().clone(function(cloned) {
        _clipboard = cloned;
      });
    }

    const onPasteObject = () =>{
      _clipboard.clone(function(clonedObj) {
        canvas.current.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = canvas.current;
          clonedObj.forEachObject(function(obj) {
            canvas.current.add(obj);
          });
          // this should solve the unselectability
          clonedObj.setCoords();
        } else {
          canvas.current.add(clonedObj);
        }
        _clipboard.top += 10;
        _clipboard.left += 10;
        canvas.current.setActiveObject(clonedObj);
        canvas.current.requestRenderAll();
      });
    }

    const onDeleteObject = () =>{

      const selectedObjects = canvas.current.getActiveObjects();
      console.log("Active objects: ", selectedObjects);
      selectedObjects.forEach((obj)=>{
        canvas.current.remove(obj);
      })

      canvas.current.discardActiveObject();
    }

    // document.onkeydown = function(event){
    //   if(event.keyCode === 46)
    //   {
    //     console.log(46)
    //   }
    // }

    const keyDownHandler = (event) =>{
      if(event.ctrlKey && event.keyCode === 67)
      {
        onCopyObject();
      }
      else if(event.ctrlKey && event.keyCode === 86)
      {
        onPasteObject();
      }
      else if(event.keyCode === 46)
      {
        onDeleteObject();
      }
      else
      {
        console.log("none");
      }
    }

    createListenersKeyboard();
    function createListenersKeyboard() {
        document.onkeydown = keyDownHandler;
        //document.onkeyup = onKeyUpHandler;
    }

    return (
      <>
    <canvas ref={fabricRef} width={640} height={360} style={{border: '1px solid black'}} />
    <button onClick={onCopyObject}>Copy</button>
    <button onClick={onPasteObject}>Paste</button>
    <button onClick={onDeleteObject}>Delete</button>
    </>
    );
  }

  export default MyFabric;