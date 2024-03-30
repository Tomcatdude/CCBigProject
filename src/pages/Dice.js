import "./Dice.css"
import React, {useState, useEffect} from "react";

export default function Rekognition(){



function DiceSet(){
    const [numDie, setNumDie] = useState(1);  
    const [d, setD] = useState(6);
    const [dice, setDice] = useState([1,6])//0: numDie, 1:d

    function RollDice(){
        const [draw, setDraw] = useState(1);  
        let counter= 0;
        
        useEffect(() => {
            const interval = setInterval(() => {
            counter += 1;
            if(counter >= 15)
                clearInterval(interval);
        
            setDraw(Math.round((Math.random()*d) + 1));    	
            }, 100);
        
            },[dice]);
            
        return <h3>{draw}</h3>;
    }

    const Dice = ({num}) => (
        Array.from({length: num}).map((_item, index) => <RollDice d={dice[1]}/>)
    )

    const rollThem = () => {
        setDice([dice[0],dice[1]])
    }
    return (
    <div className="flex-column-container">
                <h5>Number of Dice</h5>
                <input type="number" onChange={(e) => setDice([e.target.value,dice[1]])} defaultValue={numDie}/>
                <h5>Number of Sides</h5>
                <input type="number" onChange={(e) => setDice([dice[0],e.target.value])} defaultValue={d}/>
                <button onClick={rollThem} style={{ display: 'block', marginTop: '10px' }}>Re-Roll</button>
                <Dice num={dice[0]}/>

    </div>
  );
}

function GameBoard(){
    const [sets, setSets] = useState([<DiceSet/>])

    const addOne = () => {
        setSets([...sets, <DiceSet/>])
    }
    const deleteOne = () => {
        setSets(sets.slice(0,-1))
    }

    return (
        <div>
            <button onClick={addOne}>Add a Set</button>
            <button onClick={deleteOne}>Remove a Set</button>
            {sets}
        </div>
    );

};

return <GameBoard/>;
}