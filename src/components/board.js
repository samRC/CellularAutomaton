import React, { Component } from 'react';
import Square from './square';
import StateButton from './button';

export default class Board extends Component{
  constructor(props){
    super(props);

    const w = 17;
    const h = 17;
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
  
  getPaddedBoard=()=>{
    let ne=[];
    const w=this.state.width;
    const h=this.state.height;
    const s=w*h;
    let board_copy=this.state.board.slice();
    for(let j=0; j<h; j++){
      let t=board_copy.splice(0, w);
      t.unshift(null, null, null);
      t.push(null,null, null);
      ne.push(t);
    }
    ne.unshift(Array(w+6).fill(null));
    ne.push(Array(w+6).fill(null));
    board_copy=[].concat.apply([], ne);
    return board_copy;
  };

  getNeighbours=(i)=>{
    let ne=[];
    let board_copy=this.getPaddedBoard();
    const w=this.state.width+6;
    let count=-1;
    for(let j=0; j<board_copy.length; j++){
      if(count===i){
        i=j-1;break;
      }
      if(board_copy[j]!==null) count++;
    }
     //console.log(i)
     const ne_ix=[i-1, i+1, i-w, i+w, i-w-1, i-w+1, i+w-1, i+w+1];
     //const ne_i=ne_ix.filter((x)=>{return (x>-1 && x!==null);});
      ne=ne_ix.map((e)=>{
        if(board_copy[e]!==null) return board_copy[e];
        else return false;
      });
      const ne_count={};
      ne.forEach((e)=>{
        ne_count[e]=(ne_count[e] || 0)+1;
      });
      //ne['index']=i;
      return ne_count;
  };

  clearBoard=()=>{
    const clear = Array(this.state.width*this.state.height).fill(false);
    this.setState({
      board: clear,
    });
  };
  
  resetBoard=()=>{
    let board = [];
    for(let i = 0; i < this.state.width*this.state.height; i++){
      board.push(Math.random() < this.state.prob);
    }
    this.setState({
      board: board
    });
  };

  genRandC=()=>{
        let size=this.state.width*this.state.height;
        let original_board=this.state.board.slice();
     let arr=[];
     let delta=Math.ceil(0.07*size);
      let center=Math.ceil(size/2);
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
    });
  }
  // args
  // width: num of columns
  // height: num in each rows
  // probAlive: probabilty if will be set alive or not
  
  createBoard=(width, height, stateBoard)=>{
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
      );
    }
    return outSquare;
  };
  render(){
    const style = {
      float: 'none',
      margin: '10px auto',
      display: 'flex',
      flexWrap: 'wrap',
      width: '500px',
      height: '500px',
    };
    const buttonBar = {
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '100%',
      marginTop: '7px',
    };
    
    const squares = this.createBoard(this.state.width,this.state.height, this.state.board);
    return(
      <div style={style}>
        {squares}
        <div style={buttonBar}>
          <StateButton
            onClick={this.startGen}
            name={(this.state.startGen)? "Stop":"Start"}
            main_color='rgb(255, 62, 42)'
            hover_color='rgb(194, 47, 32)'/>
          <StateButton
            onClick={this.clearBoard}
            name='Clear'
            main_color='rgb(255, 62, 42)'
            hover_color='rgb(194, 47, 32)'/>
          <StateButton
            onClick={this.resetBoard}
            name='Random spaced'
            main_color='rgb(22, 143, 255)'
            hover_color='rgb(19, 126, 224)'/>
          <StateButton
            onClick={this.genRandC}
            name='Random centered'
            main_color='rgb(22, 143, 255)'
            hover_color='rgb(19, 126, 224)'/>
        </div>      </div>
    );
  }
}
