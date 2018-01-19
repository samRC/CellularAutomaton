import React, { Component } from 'react';
import Square from './square';

export default class Board extends Component{
  // args
  // width: num of columns
  // height: num in each rows
  // probAlive: probabilty if will be set alive or not
  createBoard(width, height, probAlive){
    const totalSquare = width * height;
    width = 100/width;
    height = 100/ height;
    let outSquare = [];
    for(let i = 0; i < totalSquare; i++){
      let alive = Math.random() < probAlive ? true : false;
      outSquare.push(
        <Square
          isAlive={alive}
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
    const squares = this.createBoard(10,10, .2);
    return(
      <div style={style}>
      {squares}
      </div>
    )
  }
}
