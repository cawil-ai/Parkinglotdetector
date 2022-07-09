import React, {useRef, forwardRef} from 'react'

const VideoInput=forwardRef(({width, height ,source, setSource},ref)=>{
    // const { width, height ,source, setSource} = props;
    const videoRef = useRef();
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
    console.log(inputRef);
    console.log(videoRef);


    return (
    <div className="VideoInput">
        <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
        />

        
        {!source && <button onClick={handleChoose}>Choose</button>}
        {source && (
        <video
            ref={videoRef}
            className="VideoInput_video"
            width="100%"
            height={height}
            controls
            src={source}
        />
        )}
        <div className="VideoInput_footer">{source || "Nothing selected"}</div>
    </div>
    );
})
export default VideoInput