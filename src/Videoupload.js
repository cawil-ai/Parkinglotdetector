import React, { useRef, forwardRef}from 'react'

//uploading the video
function VideoUpload(props, videoRef) {
    const {height, source, setSource}=props
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

                src={source}
                style={{
                    position: "relative",
                    zindex: 1
                }}

            /> 
            )}
            {/* {source && (
            <video
                className="VideoInput_video"
                width="100%"
                height={height}
                src={source}
                autoPlay
            /> 
            )} */}


            <div className="VideoInput_footer">{source || "Nothing selected"}</div>
        </>
            
    )
}
export default forwardRef(VideoUpload)



// {/* <h1>{`Show Video source: ${source}`}</h1>
//             {/* <img ref={imgRef} src="logo512.png" /> */}

//             <button onClick={() => setBool(prev => !prev)}> Change {bool ? "true" : "false"}</button>
//             {bool && <video ref={videoRef}
//                 width="100%"
//                 height={340}
//                 controls
//                 src="app3.mp4" />} */}