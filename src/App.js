import React, { Component } from 'react';
import './App.css';
import Board from './components/board';
import Options from './components/Options';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      ops:{}
    }
  }
  
  handleOptions=(ops)=>{
    this.setState({ops});
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CellularAutomaton</h1>
        </header>
        <Board ops={this.state.ops} handleOptions={this.handleOptions}/>
        <Options handleOptions={this.handleOptions}/>
      </div>
    );
  }
}

export default App;
