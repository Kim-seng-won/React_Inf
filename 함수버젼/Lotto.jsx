import React, {useState, useRef, useEffect, useMemo, useCallback} from "react";
import Ball from "./Ball";

function getWinNumber(){ 
    console.log("getWinNumber");
    const candidate = Array(45).fill().map((v,i)=>i+1); //1~45로 차있는 배열
    const shuffle = [];
    while (candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]); 
    }
    const bonusNumber = shuffle[shuffle.length -1]; //아무거나 하나 뽑기
    const winNumbers = shuffle.slice(0,6).sort((p,c)=>p-c); //6개 아무거나 뽑고 sort
    return [...winNumbers, bonusNumber];
}
const Lotto = () =>{
    const LottoNumbers = useMemo(()=>getWinNumber,[]);
    const [winNumbers, setWinNumbers] = useState(LottoNumbers);
    const [winballs, setWinballs] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);

    const timeouts = useRef([]);

    useEffect(() => {
        console.log('useEffect');
        for(let i=0; i< winNumbers.length-1; i++){
            timeouts.current[i] = setTimeout(()=>{
                setWinballs((prevBalls)=> [...prevBalls,winNumbers[i]   ]);
            },(i+1)*1000);
        }
        timeouts.current[6] = setTimeout(()=>{
            setBonus(winNumbers[6]);
            setRedo(true);
        },7000);
        return () =>{
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            });
        }
    },[timeouts.current]) // 빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

    const onClickRedo = useCallback(() =>{
        console.log(winNumbers)
        setWinNumbers(getWinNumber());
        setWinballs([]);
        setBonus(null);
        setRedo(false);
        
        timeouts.current = [];
    },[winNumbers]);

    return(
        <>
            <div>당첨 숫자</div>
            <div id = "결과창">
                {winballs.map((v)=><Ball key = {v} number = {v} />)}
            </div>
            <div>보너스 !</div>
            {bonus && <Ball number = {bonus}/>}
            {redo && <button onClick = {onClickRedo}>한번 더!</button>}
        </>
    );
}


export default Lotto;