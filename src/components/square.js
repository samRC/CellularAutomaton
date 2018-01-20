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
  };

  render(){
    // let color = this.state.isAlive ? 'green' : 'salmon';
    const style = {
      backgroundColor:  this.state.isAlive ? 'green' : 'salmon',
      width: this.props.width + '%',
      height: this.props.height + '%',
    }
    const shadeStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: this.state.hover ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,0)',
      position: 'relative'
    }
    return(
      <div
        style={style}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
        onClick={()=>this.setConfiguration() }>
        <div style={shadeStyle}></div>
      </div>
    )
  }
}
