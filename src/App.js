import React, {useState, useEffect} from "react";
import Webcam from "react-webcam"
import './App.css';
import './styles.css'
import {Amplify, API} from "aws-amplify"
import awsmobile from "./aws-exports"

import Navbar from "./Navbar"
import Rekognition from "./pages/Rekognition"
import Dice from "./pages/Dice"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"

function App () {
  return (
    <div className="mainBox">
      <Navbar />
      <div className="navContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rekognition" element={<Rekognition />} />
          <Route path="/dice" element={<Dice />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
