
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database"
import {getStorage, 
    ref as sref,
    uploadBytes,
  } from "firebase/storage";
  

const firebaseConfig = {
apiKey: "AIzaSyDNHadtCNbK8LPgwuQ2UU6k-M3BDz6W3Uc",
authDomain: "detections-a03f0.firebaseapp.com",
projectId: "detections-a03f0",
storageBucket: "detections-a03f0.appspot.com",
messagingSenderId: "813340895327",
appId: "1:813340895327:web:82e86b15fb1edb99c893ea",
measurementId: "G-2KFRTD2G18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage(app)
const db=getDatabase();

//for writing the usersdata
export function writeuserData( predId, box, classes, score,time){
  const reference = ref(db, 'predictions/'+predId);

    set(reference, {
      box: box,
      videoId: 1, 
      time: time,
      classes: classes,
      score:score
    })
  
}

//for uploading the video file in the database
export function uploadFile (src) {
    const vidRef = sref(storage, `videos/${1}`);
    console.log(src)
    uploadBytes(vidRef,src)
}