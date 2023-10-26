import React,{ useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CanvasComponent from './Components/CanvasComponent'
import CanvasStack from './Components/CanvasStack'
import useFabric from "./Components/useFabric"
import FabricContext from './Components/FabricContext'
import MyFabric from './Components/useFabric'
import DrawComponent from './Components/DrawComponent'
import DrawLine from './Components/Individual Components/DrawLine'
import AsyncLine from './Components/Individual Components/AsyncLine'

function App() {
  const fabricRef = useFabric();
  
  return (
    <>
    <FabricContext.Provider value={React.createRef()}>
     {/* <CanvasStack /> */}
     {/* <canvas ref={fabricRef} width={640} height={360} style={{border: '1px solid black'}}/> */}
     <MyFabric />
     {/* <FabricContextComponent /> */}
     {/* <DrawComponent /> */}
     {/* <DrawLine /> */}
     <AsyncLine />
     </FabricContext.Provider>
    </>
  )
}

export default App
