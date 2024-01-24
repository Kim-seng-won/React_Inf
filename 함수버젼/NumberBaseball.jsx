import React, { useCallback, useRef, useState } from 'react';
import Try from './Try.jsx';
import { render } from 'react-dom';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  
  return array;
}

const NumberBaseball = () =>{
    const [answer,setAnswer] = useState(getNumbers);
    const [result,setResult] = useState('');
    const [value,setValue] = useState('');
    const [tries,setTries] = useState([]);


    const onSubmitForm = (e) =>{
        e.preventDefault();
        if(value===answer){
            setTries((t)=>([
                ...t,{try:value, ok:"홈런!!"},
            ]))
            setResult("홈런!!");
            alert("게임을 다시 시작합니다.");
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputEl.current.focus();
        }
        else{
            const answarArr = value.split('').map((v)=> parseInt(v));
            let strikes = 0;
            let balls = 0;
            if(tries.length >= 9){
                setResult(`10번 이상 틀려서 실패.. 답은 ${answer}였습니다.`);
                alert("게임을 다시 시작합니다.");
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            }
            else{
                for(let i=0; i<4; i++){
                    if(answarArr[i]===answer[i]){
                        strikes++;
                    }
                    else if(answer.includes(answarArr[i])){
                        balls++;
                    }
                }
                setTries((t)=>([
                    ...t,{try:value,ok:`${strikes}스트라이크 ${balls}볼입니다.`,}
                ]));
                setValue('');
            }
        }
    }
    const onChangeForm = useCallback((e)=>setValue(e.target.value), []); 



    return(
        <>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
            <input ref={inputEl} maxLength={4} value={value} onChange={onChangeForm}/>
        </form>
        <div>{tries.length}</div>
        <ul>
            {tries.map((v,i)=>(
                <Try key = {`${i+1}차 시도 : `} tryInfo = {v} />
            ))}
        </ul>
        </>
    );
}

export default NumberBaseball;