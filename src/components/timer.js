import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
  }

  tick() {
    const { duration, timeoutFn, stopTimer } = this.props;
    if (this.state.seconds === duration) {
      timeoutFn();
    }
    else if (!stopTimer) {
      this.setState((prevState) => ({
        seconds: prevState.seconds + 1
      }));
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { duration } = this.props;
    let timeLeft = duration - this.state.seconds;
    return <span>Time Left: {timeLeft < 0 ? 0 : timeLeft}</span>;
  }
}
