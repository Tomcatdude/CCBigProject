import React, {useState, useEffect} from "react";
import Webcam from "react-webcam"
import './Rekognition.css';
import {Amplify, API} from "aws-amplify"
import awsmobile from "../aws-exports"

import Navbar from "../Navbar"
import Dice from "./Dice"
import { Route, Routes } from "react-router-dom"

Amplify.configure(
  awsmobile
);

export default function Rekognition(){
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [labels, setLabels] = useState([]);
  const [image, setImage] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [uploading, setUploading] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [data, setPostData] = useState({body: {}, headers: {}});
  const [facingMode, setFacingMode] = useState("user");

  const [resp, setResp] = React.useState("");


  const captureNew = async () => {
    setIsCapturing(true);

    const screenshot = webcamRef.current.getScreenshot();

    if (screenshot){
      setImage(screenshot);
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Invalid image format. Capture as PNG or JPEG");
    }

    setIsCapturing(false);
  };

  const handleUploadNew = () => {
    console.log("sending!");
    setIsUploading(true);

    console.log({base64Data: image});
    const data = JSON.stringify({base64Data: image, coordinates: JSON.stringify(location)});//whate

    fetch('https://zvdji54wq7.execute-api.us-east-1.amazonaws.com/dev/upload',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        console.log(data);
        setLabels(data.labels.CelebrityFaces);
        console.log(data.labels);
      } else {
        console.error("Upload failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });

    setIsUploading(false);
  };


  const webcamRef = React.useRef(null);

  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  return (
      
      <div className="app-container">
        <h3 className="instr">Identify A Celebrity</h3>
          <div className="webcam-container">
            <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            height={200}
            width={200}
            ref={webcamRef}
            videoConstraints={{
              facingMode,
            }}
            />

            <button className="actionButton" onClick={captureNew} disabled={isCapturing || isUploading}>Capture</button>
            <button className="actionButton" onClick={handleUploadNew} disabled={isCapturing || isUploading}>Upload</button>
            <button className="toggleButton" onClick={toggleCamera} disabled={isCapturing || isUploading}>Toggle Camera</button>
          </div>

        <div className="image-container">
          {labels.length > 0 && (
            <div className="labels">
              <h2>Labels:</h2>
              <ul style ={{listStyle:'none'}}>
                {labels.map((label, index) =>
                <li key={index} >{label.Name}</li>
                )}
                {labels.map((label, index) =>
                <li key={index}>
                  {label.Urls.map((url, ind) =>
                    <li key={ind} >{url}</li>
                  )}
                </li>
                  
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
  );
};
