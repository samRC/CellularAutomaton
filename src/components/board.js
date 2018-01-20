import React, { Component } from 'react';
import Square from './square';

export default class Board extends Component{
  constructor(props){
    super(props);
    this.state={
      randArr:[]
    };
  }
  createBoard(width, height){
    const totalSquare = width * height;
    width = 100/width;
    height = 100/ height;
    let outSquare = [];
    let rands=this.state.randArr.slice();
    for(let i = 0; i < totalSquare; i++){
      outSquare.push(
        <Square
        ops={this.props.ops}
          isAlive={(rands.indexOf(i))>0?true:false}
          width={width}
          height={height}
          key={i+ 'square'}
          id={i}/>
      )
    }
    return outSquare;
  }
  
  genRand=()=>{
     let size=100;
     let arr=[];
     let delta=Math.ceil(0.07*size);
      let center=size/2;
      let min=center-delta;
      let max=center+delta;
      for(let i=0; i<(0.1*size); i++){
        arr.push(min+Math.floor(Math.random()*(max-min)));
      }
      console.log(arr);
      
      return arr;
  };
  render(){
    if(this.props.ops.rand){
      let arr=this.genRand();
      this.setState({randArr:arr});
      this.props.handleOptions({rand:false});
    }
    const style = {
      float: 'none',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      width: '500px',
      height: '500px',
    };
    const squares = this.createBoard(10,10);
    return(
      <div style={style}>
      {squares}
      </div>
    )
  }
}
