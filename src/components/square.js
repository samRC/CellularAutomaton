import React, { Component } from 'react';

export default class Square extends Component{
  constructor(props){
    super(props);
    this.state = {
      hover: false,
      // isAlive: this.props.isAlive
    }
    this.toggleHover = this.toggleHover.bind(this);
  }
  toggleHover(isHover){
    this.setState({hover: isHover});
  }
  // setConfiguration=()=>{
  //   /*draw custom config-pattern*/
  //   this.setState({isAlive:!this.state.isAlive});
  // };

  render(){
    let color = this.props.isAlive ? 'green' : 'salmon';
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
        onClick={() => this.props.onClick()}>
      </div>
    )
  }
}
