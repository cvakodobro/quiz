import React from 'react';
import Select from './select'
import Card from './card';
import { getQuiz, getSession } from '../utils/getQuiz';
import Score from './score';
import ScoreBoard from './scoreBoard';
import he from 'he'

const mapCategoryToId = new Map([['Science and Nature', 17], ['Celebrities', 26], ['Sports', 21], ['Animals', 27], ['General Knowledge', 9]])

const quizzes = ['Science and Nature', 'Celebrities', 'Sports', 'Animals', 'General Knowledge']

const players = [2, 3, 4]

const questions = [10, 15, 20, 25, 30]

function computerPlayer(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve([Math.floor(Math.random() * 3), delay])
    }, delay)
  })
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.updateNumberOfPlayers = this.updateNumberOfPlayers.bind(this)
    this.updateNumberOfQuestions = this.updateNumberOfQuestions.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
    this.sessionToken = null;
  }

  componentDidMount() {
    getSession().then(session => {
      this.sessionToken = session.token;
    });
  }

  updateNumberOfPlayers(event) {
    const { setNumberOfPlayers } = this.props;
    setNumberOfPlayers(event.target.id)
  }

  updateNumberOfQuestions(event) {
    const { setNumberOfQuestions } = this.props;
    setNumberOfQuestions(event.target.value)
  }

  updateCategory(event) {
    const { setCategory } = this.props;
    setCategory(event.target.value)
  }

  startGame() {
    const {
      numberOfQuestions,
      category,
      initPlayers
    } = this.props;
    initPlayers()
    this.fetchCategory(category, numberOfQuestions)

  }

  fetchCategory(category, numberOfQuestions) {
    const { setQuizData, markCategorySelected } = this.props;
    const categoryId = mapCategoryToId.get(category)
    getQuiz(categoryId, numberOfQuestions, this.sessionToken)
      .then(quizData => setQuizData(quizData.results))
      .then(() => markCategorySelected());
  }

  restartGame() {
    const { resetGame } = this.props;
    resetGame();
  }

  populateQuizCard = (record, index) => {
    const { correct_answer, incorrect_answers, difficulty, question } = record;
    const {
      numberOfPlayers,
      addPoints,
      updateCurrentQuestion,
    } = this.props;
    let arr = []
    for (let i = 0; i < numberOfPlayers - 1; i++) {
      arr.push(computerPlayer(Math.floor(Math.random() * (14000 - 2000) + 2000)))
    }
    this.computers = Promise.all(arr)
    return (
      <Card
        key={index}
        numberOfPlayers={numberOfPlayers}
        addPoints={addPoints}
        updateCurrentQuestion={updateCurrentQuestion}
        computers={this.computers}
        question={he.decode(question)}
        duration={15}
        difficulty={he.decode(difficulty)}
        correctAnswer={he.decode(correct_answer)}
        wrongAnswers={incorrect_answers.map(x => he.decode(x))}

      />
    );
  };

  renderSwitch(key) {
    const {
      numberOfPlayers,
      numberOfQuestions,
      category,
    } = this.props;
    switch (key) {
      case 0:
        return (<div className="step-card glass">
          <h1>Number of Questions</h1>
          <Select options={questions} value={numberOfQuestions} onChange={this.updateNumberOfQuestions} />
          <h1>Select a Category</h1>
          <Select options={quizzes} value={category} onChange={this.updateCategory} />
        </div>
        )
      case 1:
        return (<div className="step-card glass"><h1>Select Number of Players</h1>{players.map((item, i) => {
          return (
            <button
              key={i}
              onClick={(e) => this.updateNumberOfPlayers(e)}
              id={item}
              className={`button ${+numberOfPlayers === item ? 'active' : ''}`}
            >
              {item}
            </button>
          )
        })}</div>)

      default:
        break;
    }
  }

  render() {
    const {
      step,
      incrementStep,
      decrementStep,
      numberOfQuestions,
      quizData,
      currentQuestion,
      points
    } = this.props;
    return (
      <div className="app">
        <div className="circle1"></div>
        <div className="circle2"></div>
        {!quizData && this.renderSwitch(step)}
        {!quizData && <div className="buttons-wrapper">
          <button className="button" key="prev" onClick={decrementStep} id="prev" disabled={step === 0}>Back
          </button>
          <button className="button" key="next" onClick={step === 1 ? this.startGame : incrementStep} id="next">{step === 1 ? 'Start' : 'Next'}
          </button>
        </div>}

        {quizData ? (<ScoreBoard points={points} />) : ''}
        {quizData && currentQuestion < numberOfQuestions
          ? this.populateQuizCard(quizData[currentQuestion], currentQuestion)
          : ''}
        {quizData && currentQuestion === numberOfQuestions ? (
          <Score score={points} refresh={this.restartGame} />
        ) : (
          ''
        )}
      </div>
    );
  }
}
