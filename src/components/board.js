import React, { Component } from 'react';
import Square from './square';
import StateButton from './button';

export default class Board extends Component{
  constructor(props){
    super(props);
    const w = 5;
    const h = 5;
    const t = w*h;
    this.state = {
      width: w,
      height: h,
      total: t,
      prob: .2,
      board: [],
      startGen:false,
      tpointer:null,
      genInterval:500,
      genCount:0
    };
  }
  componentWillMount(){
    // init state
    this.edgeBoard();
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

  copyBoard=()=>{
    const copyBoard = [];
    for(let j = 0; j < this.state.height; j++){
      copyBoard.push(this.state.board[j].slice());
    }
    return copyBoard;
  }

  cellRules=()=>{
    let neighbours={};
    let board_copy=this.copyBoard()
    const h=this.state.height;
    for(let i=0; i< this.state.total; i++){
      const arrayIndex = Math.floor(i / h);
      const indexState = i % h;
      neighbours=this.getNeighbours(i, arrayIndex, indexState);
      if(board_copy[arrayIndex][indexState]){
        if(neighbours < 2 || neighbours > 3){
          board_copy[arrayIndex][indexState] = false;
        }
      }
      else{
        if(neighbours === 3){
          board_copy[arrayIndex][indexState] = true;
        }
      }

    }
    this.setState({board:board_copy});

  };

  getNeighbours=(i, arrayIndex, indexState)=>{
    let ne=[]
    const board=this.state.board
    const w=this.state.width;
    const h=this.state.height;
    let countAlive = 0;
    const ne_i=[indexState-1 > -1 ? board[arrayIndex][indexState-1] : false,
                indexState+1 < w ? board[arrayIndex][indexState+1] : false,
                arrayIndex-1 > -1 ? board[arrayIndex-1][indexState] : false,
                arrayIndex+1 < h ? board[arrayIndex+1][indexState] : false,
                (arrayIndex-1 > -1  && indexState-1 > -1) ? board[arrayIndex-1][indexState-1] : false,
                (arrayIndex-1 > -1  && indexState+1 < w) ? board[arrayIndex-1][indexState+1] : false,
                (arrayIndex+1 < h  && indexState-1 > -1) ? board[arrayIndex+1][indexState-1] : false,
                (arrayIndex+1 < h  && indexState+1 < w) ? board[arrayIndex+1][indexState+1] : false]
    for(let k = 0; k < ne_i.length; k++){
      countAlive = ne_i[k] ? countAlive+1 : countAlive;
    }
    return countAlive;
  }

  clearBoard=()=>{
    const w = this.state.width;
    const t = this.state.total;
    let clear = [];
    for(let j = 0; j < this.state.height; j++){
      clear.push(Array(this.state.width).fill(false));
    }
    this.setState({
      board: clear,
    });
  };

  randomBoard=()=>{
    const w = this.state.width
    let board = [];
    let currArray = 0;
    for(let i = 0; i < this.state.total; i++){
      // mods will always be the same so is it better to just store everyone in an array?
      const mod = i % w;
      currArray =  mod === 0 && i != 0 ? currArray+1 : currArray;
      if(mod === 0){
        board.push([Math.random() < this.state.prob]);
      }
      else{
        board[currArray].push(Math.random() < this.state.prob);
      }
    }
    this.setState({
      board: board
    });
  };

  // edges only on live
  edgeBoard=()=>{
    const w = this.state.width;
    const t = this.state.total;
    let board = [];
    let currArray = 0;
    for(let i = 0; i < this.state.total; i++){
      const mod = i % w;
      currArray =  mod === 0 && i != 0 ? currArray+1 : currArray;
      if(mod === 0){
        board.push([false]);
      }
      else{
        board[currArray].push(false);
      }
      if(i < w || mod === 0 || mod === w-1 || i > (t-w) ){
        board[currArray][mod] = true;
      }
    }
    this.setState({
      board: board
    });
  };

  genRandC=()=>{
        let size=this.state.total;
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

  changeSquare=(i)=>{
    const board = this.copyBoard();
    const arrayIndex = Math.floor(i / this.state.width);
    const indexState = i % this.state.width;
    board[arrayIndex][indexState] = !board[arrayIndex][indexState];
    this.setState({
      board: board
    })
  }

  createBoard=(width, height, stateBoard)=>{
    const totalSquare = width * height;
    const sWidth = 100/width;
    const sHeight = 100/ height;
    let outSquare = [];
    let currArray = 0;
    for(let i = 0; i < totalSquare; i++){
      const mod = i % width;
      currArray =  mod === 0 && i != 0 ? currArray+1 : currArray;
      outSquare.push(
        <Square
          isAlive={stateBoard[currArray][mod]}
          width={sWidth}
          height={sHeight}
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
    }
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
            onClick={this.randomBoard}
            name='Random spaced'
            main_color='rgb(22, 143, 255)'
            hover_color='rgb(19, 126, 224)'/>
          <StateButton
            onClick={this.genRandC}
            name='Random centered'
            main_color='rgb(22, 143, 255)'
            hover_color='rgb(19, 126, 224)'/>
        </div>      </div>
    )
  }
}
