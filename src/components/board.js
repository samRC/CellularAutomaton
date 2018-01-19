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
      display: 'flex',
      flexWrap: 'wrap',
      width: '500px',
      height: '500px',
      alignItems: 'no-space',
    };
    const squares = this.createBoard(50,50);
    return(
      <div style={style}>
      {squares}
      </div>
    )
  }
}
