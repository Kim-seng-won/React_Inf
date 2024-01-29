import React, {Component} from "react";
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

class Lotto extends Component{
    state = {
        winNumbers: getWinNumber(),
        winballs : [],
        bonus : null,
        redo : false,
    };

    timeouts = [];

    runTimeouts = () =>{
        const {winNumbers} = this.state
        for(let i=0; i< winNumbers.length-1; i++){
            this.timeouts = setTimeout(()=>{
                this.setState((prevState)=>{
                    return{
                        winballs: [...prevState.winballs, winNumbers[i]],
                    };
                })
            },(i+1)*1000);
        }
        this.timeouts = setTimeout(()=>{
            this.setState({
                bonus : winNumbers[6],
                redo : true,
            })
        },7000)
    };

    componentDidMount(){
        this.runTimeouts();
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.winballs.length===0){
            this.runTimeouts();
        }
    }
    componentWillUnmount(){
        this.timeouts.forEach((v)=>{
            clearTimeout(v);
        })        
    }
    onClickRedo = () =>{
        this.setState({
            winNumbers : getWinNumber(),
            winballs : [],
            bonus : null,
            redo : false,
        })
        this.timeouts = [];
    }

    render(){
        const { winballs, bonus, redo} = this.state;
        return(
            <>
            <div>당첨 숫자</div>
            <div id = "결과창">
                {winballs.map((v)=><Ball key = {v} number = {v} />)}
            </div>
            <div>보너스 !</div>
            {bonus && <Ball number = {bonus}/>}
            {redo && <button onClick = {this.onClickRedo}>한번 더!</button>}
            </>
        );
    }
}
export default Lotto;