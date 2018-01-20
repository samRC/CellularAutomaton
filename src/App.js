import React, { Component } from 'react';
import './App.css';
import Board from './components/board';
import Options from './components/Options';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CellularAutomaton</h1>
        </header>
        <Board />
        <Options />
      </div>
    );
  }
}

export default App;
