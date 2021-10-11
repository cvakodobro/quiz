
import App from '../components/app';
import { connect } from 'react-redux';
import {
  setQuizQuestions,
  initPlayers,
  addPoints,
  incrementStep,
  decrementStep,
  markCategorySelected,
  setNumberOfPlayers,
  setNumberOfQuestions,
  setCategory,
  resetGame,
  incrementRightAnswers,
  updateCurrentQuestion,
} from '../actions/actions';

const mapStateToProps = state => {
  return {
    quizData: state.quizData,
    step: state.step,
    categorySelected: state.categorySelected,
    category: state.category,
    numberOfPlayers: state.numberOfPlayers,
    numberOfQuestions: state.numberOfQuestions,
    currentQuestion: state.currentQuestion,
    rightAnswers: state.rightAnswers,
    points: state.points
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setQuizData: quizData => dispatch(setQuizQuestions(quizData)),
    initPlayers: () => dispatch(initPlayers()),
    addPoints: points => dispatch(addPoints(points)),
    incrementStep: () => dispatch(incrementStep()),
    decrementStep: () => dispatch(decrementStep()),
    markCategorySelected: () => dispatch(markCategorySelected()),
    setCategory: category => dispatch(setCategory(category)),
    setNumberOfPlayers: number => dispatch(setNumberOfPlayers(number)),
    setNumberOfQuestions: number => dispatch(setNumberOfQuestions(number)),
    resetGame: () => dispatch(resetGame()),
    incrementRightAnswers: () => dispatch(incrementRightAnswers()),
    updateCurrentQuestion: currentQuestion =>
      dispatch(updateCurrentQuestion(currentQuestion))
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
