import React, { Component } from 'react';

export default class StateButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      hover: false,
    }
  }
  toggleHover(isHover){
    this.setState({hover: isHover});
  }
  render(){
    const style = {
      backgroundColor: this.state.hover ? this.props.hover_color : this.props.main_color,
      width: '90px',
      textAlign: 'center',
      padding: '7px 5px',
      border: '0',
      boxShadow: 'none',
      borderRadius: 'none',
      cursor: 'pointer'
    }
    return(
      <button
        style={style}
        onClick={() => this.props.onClick()}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
      >{this.props.name}</button>
    )
  }
}
