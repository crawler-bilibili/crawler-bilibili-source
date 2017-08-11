import React from 'react';



export default class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {date:new Date()};
  }

  componentDidMount() {
    console.log('DOM is updated to match clock render output')
    this.timerID = setInterval(
      ()=>this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.TimeID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  render(){
  return (
    <div>
      <h2>It is {this.state.date.toLocaleTimeString()}</h2>
    </div>
    )
  }
}