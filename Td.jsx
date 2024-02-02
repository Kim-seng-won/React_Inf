import React, { useCallback, useContext } from "react";
import { CODE, TableContext, OPEN_CELL, CLICK_MINE ,FLAG_CELL,FLAG_MINE,QUESTION_CELL,QUESTION_MINE,
NORMALIZE_CELL } from "./MineSearch";

const getTdStyle = (code) =>{
    switch (code){
        case CODE.NORMAL:
        case CODE.MINE:
            return{
                background: '#444',
            };
        case CODE.CLICK_MINE:
        case CODE.OPENED:
            return{
                background: 'white',
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return{
                background: 'yellow',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return{
                background: 'red',
            };
        default :
            return{
                background: 'white',
            };
    }
};
const getTdText = (code) =>{
    switch (code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICK_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!'; // 깃발 
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?'; // 물음표  
        default :
            return code || '';
        
    }
};

const Td =({rowIndex,cellIndex}) =>{
    const {tableData, dispatch,halted} = useContext(TableContext);
    const onClickTd = useCallback(() =>{
        if(halted){
            return;
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return; // 위의 경우 클릭해도 이벤트 없음
            case CODE.NORMAL:
                dispatch({type : OPEN_CELL, row : rowIndex, cell : cellIndex});
                return;
            case CODE.MINE:
                dispatch({type : CLICK_MINE, row : rowIndex, cell : cellIndex});
                return;
                        
        }
        dispatch({type : OPEN_CELL, row : rowIndex, cell : cellIndex});
    },[tableData[rowIndex][cellIndex],halted]);

    const onRightClickTd = useCallback((e) =>{ //우클릭 시 행동
        e.preventDefault(); // 우클릭 시 브라우저에서 기본으로 띄우는 메뉴 안뜨게
        if(halted){
            return;
        }
        switch (tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type : FLAG_CELL, row : rowIndex, cell : cellIndex});
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({type : QUESTION_CELL, row : rowIndex, cell : cellIndex});
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({type : NORMALIZE_CELL, row : rowIndex, cell : cellIndex});
                return;
            default:
                return;
        }
    },[tableData[rowIndex][cellIndex],halted]);
    console.log('td rendered')
    return(
        <td style = {getTdStyle(tableData[rowIndex][cellIndex])}
        onClick={onClickTd}
        onContextMenu={onRightClickTd} //onContextMenu : 우클릭 이벤트
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};
export default Td;