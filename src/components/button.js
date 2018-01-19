import React, { Component } from 'react';

export default class StateButton extends Component{
  render(){
    return(
      <button
        onClick={() => this.props.onClick()}
      >{this.props.name}</button>
    )
  }
}
