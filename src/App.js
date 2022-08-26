// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
import {detection} from "./detections";
import VideoUpload from "./VideoUpload";
import "./index.css"

import {Container,  Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [source, setSource] = useState(); // the source of the video
  const videoRef = useRef(null); //ref for the video that wil be playing
  const canvasRef = useRef(null);

  // Counter for the parkinglot 
  const [occupiedCount, setOccupiedCount] = useState(0);
  const [vacantCount, setVacantCount] = useState(0);



  const runDetection = async () => {
    //uploading the model
    const model = await tf.loadGraphModel("http://127.0.0.1:8080/model.json")
    
    console.log("Model Loaded");

    setInterval(() => { detection(model, setVacantCount, setOccupiedCount, videoRef, canvasRef) },1000);
  }

  useEffect(() => { runDetection() }, [])

  return (
    <Container className="MainCon"> 
    <Card >
      <h1>Parking lot Detector</h1>
    
      <VideoUpload
        height={480}
        ref={videoRef}
        source={source}
        setSource={setSource}
        occupiedCount={occupiedCount}
        vacantCount={vacantCount}

      />
      {source && <canvas
        ref={canvasRef}
        className="Canvas"
        style={{    
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          top: 280,
          textAlign: 'center',
          zIndex: 20,
          height: 480,
          width: 480
      }}
      />}
    </Card>
    </Container>
    
  );
}

export default App;



