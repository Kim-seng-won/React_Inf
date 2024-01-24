import React, { Component, useCallback, useRef, useState } from 'react';
import Try from './Try.jsx';
import { render } from 'react-dom';

class ResponseCheck extends Component{
    state = {
        state : 'waiting',
        message : "클릭해서 시작하세요.",
        result : [],
    }
    timeout;
    startTime;
    endTime;
    onClickScreen = () =>{
        const {state, message, result} = this.state;
        if(state === 'waiting'){
            this.setState({
                state : 'ready',
                message : '초록색이 되면 클릭하세요.',
            });
            this.startTime = new Date();
            this.timeout = setTimeout(() => {
                this.setState({
                    state : 'now',
                    message : '지금 클릭!!',
                })
            }, Math.floor(Math.random()*1000)+2000); //2초에서 3초 사이

        }
        else if (state === 'ready'){
            clearTimeout(this.timeout);
            this.setState({
                state : 'waiting',
                message : '성급했어요',
            })
        }
        else if(state === 'now'){
            this.endTime = new Date();
            this.setState((prevState) =>{
                return{
                    state : 'waiting',
                    message : '클릭해서 시작하세요',
                    result : [...prevState.result, this.endTime - this.startTime],
                }
            })
        }
    };
    onReset = () =>{
        this.setState({
            result : [], 
        });
    }
    renderAvg = () =>{
        const {result} = this.state;
        return(
            result.length === 0 
                ? null 
                : <>
                <div>
                    반응 시간 : {result.reduce((a,c) => a + c)/result.length}ms
                   
                </div>
                <button onClick={this.onReset}>초기화</button>
                </>
        )
    }

    render(){
        const {state, message, result} = this.state;
        return(
            <>
            <div
                id = "screen"
                className={state}
                onClick={this.onClickScreen}
            >
                {message}
            </div>
            {this.renderAvg()}
            </>  
        );
    }
}

export default ResponseCheck; 