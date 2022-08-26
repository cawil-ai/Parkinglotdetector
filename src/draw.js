
import {writeuserData} from "./firebase"

// Define our labelmap
const labelMap = {
    1:{name:'occupied', color:'red'},
    2:{name:'vacant', color:'#00ff15'},
}

let count=0;
// Define a drawing function
export const drawRect = ( boxes, classes, scores, 
    threshold, imgWidth, imgHeight,
    ctx, setVacantCount, setOccupiedCount,
    currentTime)=>{

    setVacantCount(prev=>0)
    setOccupiedCount(prev=>0)
    for(let i=0; i<=boxes.length; i++){


        if(boxes[i]&& classes[i] && scores[i]>threshold){

            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i];

            //disable the writing into the database
            // writeuserData( count ,boxes[i], classes[i], scores[i], currentTime)
            count++;


            if (text===1){setOccupiedCount(prev=>prev+1)}
            if (text===2) {setVacantCount(prev=> prev+1)}

            
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/2);
            ctx.stroke()
        }
    }
}