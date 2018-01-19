import React, { Component } from 'react';
import Square from './square';

export default class Board extends Component{
  createBoard(width, height){
    const totalSquare = width * height;
    width = 100/width;
    height = 100/ height;
    let outSquare = [];
    for(let i = 0; i < totalSquare; i++){
      outSquare.push(
        <Square
          isAlive={false}
          width={width}
          height={height}
          key={i+ 'square'}/>
      )
    }
    return outSquare;
  }
  render(){
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
