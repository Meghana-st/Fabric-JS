import { useContext, useState, useEffect } from "react";
import FabricContext from "../FabricContext";

const TextComponent = () =>{

    const canvas = useContext(FabricContext);
    const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
    
    useEffect(()=>{

        if (!canvas.current) return;
    },[]);

    // const handleText = (options) =>{
    //     console.log("placeholder", isPlaceholderVisible);
    //     if (isPlaceholderVisible) {
    //         // Clear the placeholder text and make it invisible
    //         textbox.set({ text: '', fill: 'black' });
    //         setPlaceholderVisible(false);
    //         canvas.renderAll(); // Refresh the canvas
    //       }
    // }

    const addTextBox=()=>{
        const textbox = new fabric.Textbox("Enter text...", {
            top: 250,
            left: 400,
            width: 200,
            fontSize: 20,
            padding: 10,
            fontFamily: "Helvetica",
            borderColor: "black"
         });

         canvas.current.add(textbox);

        // textbox.on('mousedown', handleText);

    }

    return(<button onClick={addTextBox}>Add text</button>)
}

export default TextComponent;