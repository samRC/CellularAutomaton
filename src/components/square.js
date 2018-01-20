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
    const style = {
      backgroundColor: this.props.isAlive ? 'green' : 'salmon',
      width: this.props.width + '%',
      height: this.props.height + '%',
      cursor: 'pointer'
    }
    const shadeStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: this.state.hover ? 'rgba(0,0,0,.6)' : 'rgba(0,0,0,0)',
      position: 'relative'
    }
    return(
      <div
        style={style}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
        onClick={() => this.props.onClick()}>
        <div style={shadeStyle}></div>
      </div>
    )
  }
}
