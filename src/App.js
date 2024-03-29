import React, {useState, useEffect} from "react";
import Webcam from "react-webcam"
import './App.css';
import './styles.css'
import {Amplify, API} from "aws-amplify"
import awsmobile from "./aws-exports"

import Navbar from "./Navbar"
import Rekognition from "./pages/Rekognition"
import Dice from "./pages/Dice"
import { Route, Routes } from "react-router-dom"

function App () {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/rekognition" element={<Rekognition />} />
          <Route path="/dice" element={<Dice />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
