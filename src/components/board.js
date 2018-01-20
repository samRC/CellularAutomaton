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
      startGen:false,
      tpointer:null,
      genInterval:500,
      genCount:0
    };
    this.createBoard = this.createBoard.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.resetBoard = this.resetBoard.bind(this);

  }
  
  startGen=()=>{
    console.log('in start gen');
    this.setState({startGen:!this.state.startGen});
    this.applyRules();
    
  };
  
  applyRules=()=>{
    
    if(!this.state.startGen){
      let t=setInterval(()=>{
        //console.log('genaration passed');
        this.cellRules();
      }, this.state.genInterval);
      this.setState({tpointer:t});
      //console.log('set tp');
    }else{
      //console.log('clear tp');
      clearInterval(this.state.tpointer);
    }
  };
  
  cellRules=()=>{
    let neighbours={};
    let board_copy=this.state.board.slice();
    for(let i=0; i<(this.state.width*this.state.height); i++){
      neighbours=this.getNeighbours(i);
      //console.log(neighbours["true"]);
      if(board_copy[i]){
        if(neighbours["true"]<2 || neighbours["true"]>3 || neighbours["true"]===undefined) 
              board_copy[i]=false;
        else if(neighbours["true"]===3 || neighbours["true"]===2) 
              board_copy[i]=true;
      }else{
        if(neighbours["true"]===3) board_copy[i]=true;
      }
      
    }
    this.setState({board:board_copy});
    
  };
  
  getNeighbours=(i)=>{
    let ne=[]
     const board_copy=this.state.board.slice();
     const w=this.state.width;
     const ne_i=[i-1, i+1, i-w, i+w, i-w-1, i-w+1, i+w-1, i+w+1];
    ne=ne_i.map(e=>board_copy[e]);
    const ne_count={};
    ne.forEach((e)=>{
      ne_count[e]=(ne_count[e] || 0)+1
    });
    return ne_count;
  };
  
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
  
  genRandC=()=>{
        let size=this.state.width*this.state.height;
        let original_board=this.state.board.slice();
     let arr=[];
     let delta=Math.ceil(0.07*size);
      let center=size/2;
      let min=center-delta;
      let max=center+delta;
      for(let i=0; i<(0.1*size); i++){
        arr.push(min+Math.floor(Math.random()*(max-min)));
      }
      original_board=original_board.map((e, i)=>{
        if(arr.indexOf(i)>0) return true;
        else return false;
      });
      this.setState({board:original_board});
  };
  
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
        onClick={this.startGen}
        name={(this.state.startGen)? "Stop":"Start"}
        />
      <StateButton
        onClick={this.clearBoard}
        name='Clear'
      />
      <StateButton
        onClick={this.resetBoard}
        name='random-spaced'
      />
      
      <StateButton
        onClick={this.genRandC}
        name='random-centered'
        />
      
      </div>
    )
  }
}
