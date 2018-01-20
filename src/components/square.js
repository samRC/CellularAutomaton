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
    /*draw custom config-pattern*/
    this.setState({isAlive:!this.state.isAlive});
    console.log(this.props.id);
  };
  
  render(){
    let color="salmon";
    if(this.props.isAlive){
        color = this.props.isAlive ? 'green' : 'salmon';
    }else if(this.state.isAlive){
        color = this.state.isAlive ? 'green' : 'salmon';
    }
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
