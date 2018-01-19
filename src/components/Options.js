import React, {Component} from 'react';

const style={
    fontSize:50+"px",
    padding:5+"px",
    margin:15+"px"
};

export default class Options extends Component{
    constructor(props){
        super(props);
        this.state={started:false};
    }
    
    toggleStart=()=>{
        this.setState({started:!this.state.started});
    };
    
    render(){
        
        return (
            <div style={style}>
                <button
                onClick={()=>this.toggleStart()}
                style={style}>
                {this.state.started?"Stop":'Start'}
                </button>
                <button style={style}>Clear</button>
                <button style={style}>Random</button>
            </div>
            );
    }
}