import React, { Component } from 'react';

export default class Square extends Component{
  constructor(props){
    super(props);
    this.state = {
      hover: false,
      isAlive: false
    }
    this.toggleHover = this.toggleHover.bind(this);
  }
  toggleHover(isHover){
    this.setState({hover: isHover});
  }
  
  setConfiguration=()=>{
    this.setState({isAlive:true});
  };
  
  render(){
    let color = this.state.isAlive ? 'green' : 'salmon';
    const style = {
      backgroundColor: this.state.hover ? 'black' : color,
      width: this.props.width + '%',
      height: this.props.height + '%',
    }
    return(
      <div
        style={style}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
        onClick={()=>this.setConfiguration() }>
      </div>
    )
  }
}
