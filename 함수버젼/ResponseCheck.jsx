import React, {useCallback, useState, useRef} from "react";

function ResponseCheck(){
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    const Timeout = useRef(null); //값이 바뀌어도 재랜더링 하지 않을거면 Ref로 선언
    const startTime = useRef();
    const endTime = useRef();
    const onClickScreen = (e) => {
        if(state==='waiting'){
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
            startTime.current = new Date();
            Timeout.current = setTimeout(()=>{
                setState('now');
                setMessage('지금! 클릭!');
            },Math.floor(Math.random()*1000)+2000);
        }
        else if(state==='ready'){
            clearTimeout(Timeout.current)
            setState('waiting');
            setMessage('성급하다..');
        }
        else if(state === 'now'){
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult)=>{
                return [...prevResult, endTime.current-startTime.current]; //Ref current!!
            });
        }
    }
    const onReset = () =>{
        setResult([]);
    }
    const renderAvg = (e) =>{
        return(
            result.length === 0
            ? null
            : 
            <>
            <div>
                반응 시간 : {result.reduce((a,c)=>a+c)/result.length}ms
            </div>
            <button onClick={onReset}>초기화</button>
            </>
        )
    }
    return(
        <>
        <div id = "screen"
        className={state}
        onClick={()=>onClickScreen()}>
            {message}
        </div>
        {renderAvg()}
        </>
    )
}
export default ResponseCheck;