import React, {useState, useRef} from 'react'
import VideoInput from './Videoupload'

function App() {
  return (
    <div className="App">
      <h1>Video upload</h1>
      <VideoInput width={400} height={300} />
    </div>
  );
}

export default App;
