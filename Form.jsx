import React,{useCallback, useState, useContext, memo} from "react";
import { TableContext, START_GAME } from "./MineSearch";

const Form = memo(() =>{
    console.log('MineSearch rendered');

    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);
    const {dispatch} = useContext(TableContext);

    const onChangeRow = useCallback((e) =>{
        setRow(e.target.value);
    },[])
    const onChangeCell = useCallback((e) =>{
        setCell(e.target.value); 
    },[])
    const onChangeMine = useCallback((e) =>{
        setMine(e.target.value);
    },[])
    const onClickBtn = useCallback((e)=>{
        dispatch({type: START_GAME, row,cell,mine});
    },[row,cell,mine])


    return (
        <div>
            <input type="event" placeholder="세로" value={row} onChange={onChangeRow}/>
            <input type="event" placeholder="가로" value={cell} onChange={onChangeCell}/>
            <input type="event" placeholder="지뢰" value={mine} onChange={onChangeMine}/>
            <button onClick={onClickBtn}>시작</button>
        </div>
    );
});
export default Form;