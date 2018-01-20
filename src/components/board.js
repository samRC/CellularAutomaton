import React, { Component } from 'react';
import Square from './square';
import StateButton from './button';

export default class Board extends Component{
  constructor(props){
    super(props);
    const w = 10;
    const h = 10;
    const probAlive = .1;
    let board = [];
    for(let i = 0; i < w*h; i++){
      board.push(Math.random() < probAlive);
    }
    this.state = {
      width: w,
      height: h,
      prob: probAlive,
      board: board,
    }
    this.createBoard = this.createBoard.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.resetBoard = this.resetBoard.bind(this);

  }
  clearBoard(){
    const clear = Array(this.state.width*this.state.height).fill(false);
    this.setState({
      board: clear,
    })
  }
  resetBoard(){
    let board = [];
    for(let i = 0; i < this.state.width*this.state.height; i++){
      board.push(Math.random() < this.state.prob);
    }
    this.setState({
      board: board
    })
  }
  changeSquare(i){
    const board = this.state.board.slice();
    board[i] = !board[i];
    this.setState({
      board: board
    })
  }
  // args
  // width: num of columns
  // height: num in each rows
  // probAlive: probabilty if will be set alive or not
  createBoard(width, height, stateBoard){
    const totalSquare = width * height;
    width = 100/width;
    height = 100/ height;
    let outSquare = [];
    for(let i = 0; i < totalSquare; i++){
      outSquare.push(
        <Square
          isAlive={stateBoard[i]}
          width={width}
          height={height}
          onClick={() => this.changeSquare(i)}
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
    const squares = this.createBoard(this.state.width,this.state.height, this.state.board);
    return(
      <div style={style}>
      {squares}
      <StateButton
        onClick={this.clearBoard}
        name='Clear'
      />
      <StateButton
        onClick={this.resetBoard}
        name='reset'
      />
      </div>
    )
  }
}
