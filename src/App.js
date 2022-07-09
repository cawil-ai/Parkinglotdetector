// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
import {drawRect} from "./draw"; 
import VideoInput from "./Videoupload";

function App() {
  const [source, setSource] = useState();
  const videoRef=useRef()
  
  if (source !== undefined ){ //&& videoRef.current !== null
    // console.log(videoRef)

    // tf.browser.fromPixels(videoRef);
  }
  
 


  return (
    <div className="App">
      <h1>Video upload</h1>

      <VideoInput
        ref={videoRef} 
        source={source}
        setSource={setSource} 
        width={450} 
        height={300} />

    </div>
  );
}

export default App;
