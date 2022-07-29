import React, { useRef, forwardRef} from 'react'
import { Form,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//uploading the video
function VideoUpload(props, videoRef) {
    const {height, source, setSource,occupiedCount ,vacantCount}=props
    const inputRef = useRef();

    //source
    const handleFileChange = (event) => { //setting the url for the video
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
    };

    const handleChoose = (event) => {
    inputRef.current.click();
    };


    return (
        <>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Control 
                ref={inputRef} 
                onChange={handleFileChange} 
                type="file" 
                accept=".mov,.mp4"/>
            </Form.Group>
            {source && 
            <Container className="Aux">
                <Container className="PlayPause"> 

                <img width="50" height="50" 
                onClick={()=> {videoRef.current.play()}} 
                src="./play-circle.svg"
                onMouseOver={e=>e.currentTarget.src="./play-circle-fill.svg"}
                onMouseOut={e=>e.currentTarget.src="./play-circle.svg"}
                />
                
                <img width="50" height="50" 
                onClick={() => { videoRef.current.pause() }}
                src="./pause-circle.svg"
                onMouseOver={e=>e.currentTarget.src="./pause-circle-fill.svg"}
                onMouseOut={e=>e.currentTarget.src="./pause-circle.svg"}
                />
                </Container>

                <Container className="Counter">
                <h3>Vacant: {vacantCount}</h3>
                <h3>Occupied: {occupiedCount}</h3>
                </Container>
            </Container>

            }
            {source && (
            <video
                ref={videoRef}
                className="VideoInput_video"
                width="100%"
                height={height}

                src={source}
                style={{
                    position: "relative",
                    zindex: 1
                }}

            /> 
            )}
            
        </>
            
    )
}
export default forwardRef(VideoUpload)





//             <button onClick={() => setBool(prev => !prev)}> Change {bool ? "true" : "false"}</button>