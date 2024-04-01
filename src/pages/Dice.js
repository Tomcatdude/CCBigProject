import "./Dice.css"
import React, {useState, useEffect, useCallback} from "react";

export default function Dice(){



function DiceSet({sum, setSum}){
    const [dice, setDice] = useState([1,6])//0: numDie, 1:d

    function RollDice(){
        const [draw, setDraw] = useState(1);  
        let counter= 0;
        
        useEffect(() => {
            const interval = setInterval(() => {
            counter += 1;
            if(counter >= 15)
                clearInterval(interval);
        
            setDraw(Math.round((Math.random()*(dice[1]-1)) + 1));    	
            }, 100);
        
            },[]);

        
            //setSum([...sum, draw])
            
        return <h2 className="diceBody">  &nbsp;{draw}&nbsp;  </h2>;
    }

    const Dice = ({num}) => (
        Array.from({length: num}).map((_item, index) => <RollDice d={dice[1]}/>)
    )

    const rollOnDChange = (num) => {
        setSum([])
        setDice([dice[0],num])
    }

    const rollOnNumDChange = (num) => {
        setSum([])
        setDice([num,dice[1]])
    }

    const rollThem = () => {
        setSum([])
        setDice([dice[0],dice[1]])
    }
    return (
        <div className="flex-column-container">
                    <p className="paramsBody">Number of Dice</p>
                    <input type="number" className="numDForm" max="6" onChange={(e) => rollOnNumDChange(e.target.value)} defaultValue={dice[0]}/>
                    <p className="paramsBody">Number of Sides</p>
                    <input type="number" className="dForm" max="100" onChange={(e) => rollOnDChange(e.target.value)} defaultValue={dice[1]}/>
                    <button onClick={rollThem} className="rerollButton" style={{ display: 'block', marginTop: '10px' }}>Re-Roll</button>
                    <div className="flex-row-container">
                        <Dice num={dice[0]}/>
                    </div>

        </div>
    
  );
}

function DiceBox(){
    const [dSum, setDSum] = useState([])
    const [fullSum, setFullSum] = useState(0);

    function add(accumulator, a) {
        return accumulator + a;
    }

    const handleSum = useCallback((e) => {
        setDSum(e);
        setFullSum(dSum.reduce(add,0));
    },[])
    return (
        <div className="diceBox">
            <DiceSet sum={dSum} setSum={handleSum}/>
        </div>
    )
}

function GameBoard(){
    const [sets, setSets] = useState([<DiceBox/>])

    const addOne = () => {
        setSets([...sets, <DiceBox/>])
    }
    const deleteOne = () => {
        setSets(sets.slice(0,-1))
    }

    return (
        <div className="gameBoard">
            <h3 className="instr">Roll Some Dice</h3>
            <div>
            <button className="settersButton" onClick={addOne}>Add a Set</button>
            <button className="settersButton" onClick={deleteOne}>Remove a Set</button>
            </div>
            {sets}
        </div>
    );

};

return <GameBoard/>;
}