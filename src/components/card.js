import React from 'react';
import Timer from './timer';

export default class Card extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.state = {
      seconds: 0,
      disabled: false,
      active: null,
      computerans: null,
      stopTimer: false
    };

  }

  tick() {
    const { duration } = this.props;
    if (this.state.seconds === duration) {
      this.setState((prevState) => ({
        seconds: 0
      }));
    } else {
      this.setState((prevState) => ({
        seconds: prevState.seconds + 0.1
      }));
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.interval = setInterval(() => this.tick(), 100);
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.interval);
  }

  checkAnswer(answer, i, correctAnswer) {

    return () => {
      const {
        addPoints,
        updateCurrentQuestion,
        currentQuestion,
        numberOfPlayers,
        computers
      } = this.props;
      this.setState(() => ({
        disabled: true,
        active: i,
      }));
      let points = new Array(numberOfPlayers).fill(0)
      let currentTime = Math.floor(this.state.seconds * 1000)
      let computersA = [[], [], []]

      computers.then((data) => {
        if (this._isMounted) {
          this.setState(() => ({
            stopTimer: true
          }));
          const correctAnswers = data.filter(el => this.answers[el[0]] === correctAnswer)
          let minTime
          if (answer === correctAnswer)
            minTime = Math.min(...correctAnswers.map(x => x[1]), currentTime)
          else 
            minTime = Math.min(...correctAnswers.map(x => x[1]))

          if (answer === correctAnswer) {
            points[0] = minTime === currentTime ? 15 : 10
          }
          else if (answer === null) {
            points[0] = -10
          }
          else {
            points[0] = -5
          }

          for (let i = 0; i < data.length; i++) {
            if (this.answers[data[i][0]] === correctAnswer) {
              points[i + 1] = minTime === data[i][1] ? 15 : 10
            }
            else {
              points[i + 1] = -5
            }
            computersA[data[i][0]].push(i + 1)
          }
          this.setState(() => ({
            computerans: computersA
          }));
          addPoints(points);
        }
      }).then(() => {
        if (this._isMounted) {
          setTimeout(() => {
            updateCurrentQuestion(currentQuestion);
            this.setState(() => ({
              seconds: 0,
              disabled: false,
              active: null,
              computerans: null,
              stopTimer: false
            }));
          }, 3000)
        }
      })

    };
  }

  render() {
    const {
      difficulty,
      question,
      duration,
      wrongAnswers,
      correctAnswer,
    } = this.props;
    this.answers = [correctAnswer].concat(wrongAnswers.slice(0, 2)).sort();
    return (
      <div className="glass card">
        <header>
          <span>{difficulty} | </span>
          <Timer duration={duration} timeoutFn={this.checkAnswer(null, correctAnswer)} stopTimer={this.state.stopTimer} />
        </header>
        <div>
          <p>{question}</p>
        </div>
        <footer>
          {this.answers.map((answer, i) => {
            return (
              <div key={answer} className="answer-wrapper">
                <button className={`button question ${this.state.disabled ? 'disabled' : ''} ${i === this.state.active ? 'active' : ''} ${answer === correctAnswer && this.state.stopTimer ? 'correct' : ''}`} onClick={this.checkAnswer(answer, i, correctAnswer)} id={i} disabled={this.state.disabled}>
                  {answer}
                </button>
                {this.state.computerans ? this.state.computerans[i].map((el, j) => <div key={j} className='computer-answer'>{el}</div>) : ''}
              </div>
            );
          })}
        </footer>
      </div>
    );
  }
}
