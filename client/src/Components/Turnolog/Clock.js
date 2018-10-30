import React, { Component } from 'react';

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
  }

  componentWillUnmount() {
      clearInterval(this.timerID);
  }

  tick = () => {
      this.setState({
        date: new Date()
      });
  }
  render() {
    const { date } = this.state
    return (
      <div className="row col-lg-4 col-xs-4 center-xs">
        <span>Hora: {date.toLocaleTimeString()}</span>
      </div>
    );
  }

}

export default Clock;
