import "./Dice.css"
import React, {useState, useEffect, useCallback} from "react";

export default function Rekognition(){



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
        
            setDraw(Math.round((Math.random()*dice[1]) + 1));    	
            }, 100);
        
            },[]);

        
            //setSum([...sum, draw])
            
        return <h3>{draw}</h3>;
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
                <h5>Number of Dice</h5>
                <input type="number" onChange={(e) => rollOnNumDChange(e.target.value)} defaultValue={dice[0]}/>
                <h5>Number of Sides</h5>
                <input type="number" onChange={(e) => rollOnDChange(e.target.value)} defaultValue={dice[1]}/>
                <button onClick={rollThem} style={{ display: 'block', marginTop: '10px' }}>Re-Roll</button>
                <Dice num={dice[0]}/>

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
        <div>
            <DiceSet sum={dSum} setSum={handleSum}/>
            <h4>Sum: {fullSum}</h4>
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
        <div>
            <button onClick={addOne}>Add a Set</button>
            <button onClick={deleteOne}>Remove a Set</button>
            {sets}
        </div>
    );

};

return <GameBoard/>;
}