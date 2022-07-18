// Import dependencies
import React, { useRef, useState, useEffect} from "react";
import * as tf from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
import { drawRect } from "./draw";
import VideoUpload from "./VideoUpload";
import "./index.css"

function App() {
  const [source, setSource] = useState(); // the source of the video
  const videoRef = useRef(null); //ref for the video that wil be playing
  const canvasRef = useRef(null);

  // Counter for the parkinglot 
  const [occupiedCount, setOccupiedCount] = useState(0);
  const [vacantCount, setVacantCount] = useState(0);

  //function for detecting the data
  const detection = async(model) => {

    //checker
    // console.log(videoRef.current.videoWidth, videoRef.current.videoHeight);
    // console.log(videoRef.current !== null, videoRef.current.videoWidth !== 0);

    //the detection
    if (videoRef.current !== null) {
      // console.log("hello");

      const video = videoRef.current
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      console.log(videoRef); //, videoWidth, videoHeight, video

      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640,480])
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await model.executeAsync(expanded)

      // console.log(await obj[0].array()); //7 classes; 2 boxes?
                //3 5 preprocessed 4 negative 6 1 whole number 
      const boxes = await obj[2].array()
      const classes = await obj[7].array()
      const scores = await obj[0].array()

    
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.3, videoWidth, videoHeight, ctx, setVacantCount, setOccupiedCount)}); 

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)
    }
  }

  const runDetection = async () => {
    //uploading the model
    const model = await tf.loadGraphModel("http://127.0.0.1:8080/model.json")

    // console.log(model);
    // console.log(videoRef);
    // console.log(source);
    // console.log(canvasRef);
    console.log("Model Loaded");

    //detectin loop
    setInterval(()=>{detection(model)}, 5);
  }



  useEffect(()=>{runDetection()}, [])


  return (
    <div className="App">
      <h1>Parking lot Detector</h1>
      <h3>Vacant:{vacantCount}</h3>
      <h3>Occupied: {occupiedCount}</h3> 
      <VideoUpload
        height={480}
        ref={videoRef}
        source={source}
        setSource={setSource}

      />
      {source && <canvas
        ref={canvasRef}
        classname="canvas"
        style={{
          
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          top: 160,
          textAlign: 'center',
          zIndex: 20,
          width: 640,
          height: 480
        
          
        }}
      />}


    </div>
  );
}

export default App;

  // if (source !== undefined ){ //&& videoRef.current !== null
  //   // console.log(videoRef)
  

