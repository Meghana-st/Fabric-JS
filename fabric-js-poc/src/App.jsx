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
import StateLine from './Components/Individual Components/StateLine'
import TextComponent from './Components/Individual Components/TextComponent'

function App() {
  const fabricRef = useFabric();
  
  return (
    <>
    <FabricContext.Provider value={React.createRef()}>
    {/* <CanvasStack /> */}
    <MyFabric />
    {/* <DrawComponent /> */}
    {/* <DrawLine /> */}
    {/* <StateLine /> */}
    <TextComponent />
     </FabricContext.Provider>
    </>
  )
}

export default App
