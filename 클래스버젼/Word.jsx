
const React = require('react');
const ReactDom = require('react-dom');


class WordRelay extends React.Component{
    state = {
        word : '김승원',
        value : '',
        result : '',
    };
    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length-1]=== this.state.value[0]){
            this.setState({
                word : this.state.value,
                value : '',
                result : '딩동댕',
            })
            this.input.focus();
        }else{
            this.setState({
                value : '',
                result : '땡',
            })
            this.input.focus(); 
        }
    };
    onChange = (e) => {
        this.setState({value : e.target.value});
    };
    input;
    onRef = (c) =>{
        this.input = c;
    }
    render() {
        return(
        <>
            <div>{this.state.word}</div>
            <form onSubmit={this.onSubmitForm}>
                <input ref = {this.onRef} value={this.state.value} onChange={this.onChange} />
                <button>확인해보세요오오오!</button>
            </form>
            <div>{this.state.result}</div>
        </>
        );
    }
}