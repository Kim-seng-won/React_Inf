import React, { createRef, useCallback, useState } from 'react';
import Try from './Try.jsx';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends PureComponent {
  state = {
    result: '',
    value: '',
    answer: getNumbers(), // ex: [1,3,5,7]
    tries: [], // push 쓰면 안 돼요
  };

  
  onSubmitForm = (e) => {
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if(value === answer){
        this.setState((prevState)=>{
          return{
            result : '홈런!',
            tries : [...prevState.tries,{try: value,result:'정답입니다.!'}]
          }
        });
        alert("게임을 다시 시작합니다.");
        this.setState((prevState)=>{
          return{
            value : '',
            answer : getNumbers(),
            tries : [],
          }
        });
        this.inputRef.current.focus();
    }
    else {
        const answarArr = value.split('').map((v)=> parseInt(v));
        let strikes = 0;
        let balls = 0;
        if(tries.length >= 9){
            result = `10번 이상 틀려서 실패.. 답은 ${answer}였습니다.`;
            alert("게임을 다시 시작합니다.");
            this.setState({
                value : '',
                answer : getNumbers(),
                tries : [],
            })
            
          this.onInputRef.focus();
        }
        else{
            for(let i=0; i<4; i++){
                if(answarArr[i]===answer[i]){
                    strikes+=1;
                }
                else if(answer.includes(answarArr[i])){
                    balls+=1;
                }
            }
            this.setState((prevState)=> {
                return{
                    tries : [...prevState.tries,{try:value, result:`${strikes}스트라이크 ${balls}볼`}],
                    value : '',
                };
            });
        }

    }
  };

  onChangeInput = (e) => {
    this.setState({value:e.target.value});
  };

  inputRef = createRef();

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
      <h1>{result}</h1>
      <form onSubmit={this.onSubmitForm}>
        <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput}/>
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v,i)=>{
            return(
                <Try key={`${i+1}차 시도 : `} tryInfo = {v} />
            );
        })
        }
      </ul>
      </>
    );
  }
}
