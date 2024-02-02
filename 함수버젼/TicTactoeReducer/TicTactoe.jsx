import React, {useState, useReducer, useCallback, useEffect} from "react";
import Table from "./Table";

const initialState = { //초기값을 객체로 넣어준다.
    winner : '',
    turn : 'O',
    tableData : [
                ['','',''],
                ['','',''],
                ['','','']],
    recentCell : [-1,-1],
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action)=> {
    switch(action.type){
        case 'SET_WINNER' : 
            // state.winner = action.winner 이렇게 바꾸면 안됨. 새로운 객체를 만들어 바뀐 값만 바꿔줘야함.
            return{
                ...state,//스프레드 문법으로 기존 state를 얕은 복사 한다.
                winner : action.winner,
            }
        case 'CLICK_CELL' : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn; 
            return{
                ...state,
                tableData,
                recentCell : [action.row, action.cell],
            };
        }
        case 'CHANGE_TURN' : {
            return{
                ...state,
                turn : state.turn === 'O' ? 'X' : 'O',
            };
        }
        case 'RESET_GAME' : {
            return{
                ...state,
                turn : 'O',
                tableData : [
                            ['','',''],
                            ['','',''],
                            ['','','']],
                recentCell : [-1,-1],
            };
        }
        default : return state;
    }
};

const TicTactoe = () =>{
    const [state, dispatch] = useReducer(reducer,initialState);
    const {tableData, turn, recentCell} = state;
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('');
    // const [tableData, setTableData] = useState(['','',''],['','',''],['','','']);

    const onClickTable = useCallback(()=>{
        dispatch({type: 'SET_WINNER',winner : turn })  //dispatch를 통해 action을 실행한다.
    },[state.winner]);

    useEffect(()=>{
        const [row,cell] = recentCell;
        if(row<0){
            return;
        }
        let win = false;
        if(tableData[row][0]===turn && tableData[row][1]===turn && tableData[row][2]===turn){
            win = true;
        }
        if(tableData[0][cell]==turn && tableData[1][cell]==turn && tableData[2][cell]==turn){
            win = true;
        }
        if(tableData[0][0]==turn &&tableData[1][1]==turn &&tableData[2][2]==turn){
            win = true;
        }
        if(tableData[0][2]==turn &&tableData[1][1]==turn &&tableData[2][0]==turn){
            win = true;
        }
        if(win){
            dispatch({type : SET_WINNER, winner : turn})
            dispatch({type : RESET_GAME});
        }
        else{
            let all = true;
            tableData.forEach((row)=>{
                row.forEach((cell)=>{
                    if(!cell){
                        all = false;
                    }
                });
            });
            if(all){
                dispatch({type:RESET_GAME});
            }
            else{
                dispatch({type:CHANGE_TURN});
            }
        }
    },[recentCell]);
    
    return(
        <>
        <Table onClick = {onClickTable} tableData = {tableData} dispatch={dispatch}/>
        {state.winner && <div>{state.winner}님의 승리</div>} //state.winner의 값이 존재한다면 && 으로 뒤의 값을 실행한다.
        </>
    );
}

export default TicTactoe;