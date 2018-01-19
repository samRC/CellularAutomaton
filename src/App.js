import React, { Component } from 'react';
import './App.css';
import Board from './components/board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CellularAutomaton</h1>
        </header>
        <Board />
      </div>
    );
  }
}

export default App;
