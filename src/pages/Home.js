import "./Home.css"
import React, {useState, useEffect, useCallback} from "react";

export default function Home(){

    return(
        <div className="homeBox">
            <h3>Welcome!</h3>
            <p className="head">Tools currently available on this site:</p>
            <p className="tool">• Find Celebrity</p>
            <p className="toolDesc">&nbsp;&nbsp;&nbsp;&nbsp;‣ Take a picture of a celebrity on a TV or in real life and &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;we will tell you who it is</p>
            <p className="toolDesc">&nbsp;&nbsp;&nbsp;&nbsp;‣ We will also give you links to find more about them</p>
            <p className="tool">• Dice</p>
            <p className="toolDesc">&nbsp;&nbsp;&nbsp;&nbsp;‣ Roll some dice</p>
            <p className="toolDesc">&nbsp;&nbsp;&nbsp;&nbsp;‣ Change the amount of sides</p>
            <p className="toolDesc">&nbsp;&nbsp;&nbsp;&nbsp;‣ Add multiple sets of dice</p>
        </div>
    )
}