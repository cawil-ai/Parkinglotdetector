import { drawRect} from "./draw";
import * as tf from "@tensorflow/tfjs";

//function for detecting the data
export const detection = async (model,setVacantCount, setOccupiedCount,  videoRef, canvasRef) => {
    

    //the detection 
    if (videoRef.current !== null && videoRef.current.paused==false) {

      
      const video = videoRef.current
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;


      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      
      
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 640]);
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await model.executeAsync(expanded)

      const boxes = await obj[2].array()
      const classes = await obj[1].array()
      const scores = await obj[0].array()

      // // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // // 5. TODO - Update drawing utility
      // drawSomething 
      requestAnimationFrame(() => { drawRect( boxes[0], classes[0], scores[0], 0.55,
        videoWidth, videoHeight,
        ctx, 
        setVacantCount, setOccupiedCount,
        videoRef.current.currentTime) });
      
      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)
      
    }
  }