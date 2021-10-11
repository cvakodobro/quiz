export const initialState = {
  step: 0,
  quizData: null,
  points: null,
  rightAnswers: 0,
  currentQuestion: 0,
  numberOfPlayers: 3,
  numberOfQuestions: 10,
  category: 'Science and Nature',
  categorySelected: false
};

export const updateState = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_STEP':
      return Object.assign({}, state, {
        step: state.step + 1
      });
    case 'DECREMENT_STEP':
      return Object.assign({}, state, {
        step: state.step - 1
      });
    case 'SET_QUIZ_QUESTIONS':
      return Object.assign({}, state, {
        quizData: action.quizData
      });
    case 'INIT_PLAYERS_POINTS':
      return Object.assign({}, state, {
        points: new Array(state.numberOfPlayers).fill(0)
      });
    case 'ADD_POINTS':
      let points_matrix = [[...state.points], action.points]
      let result = points_matrix.reduce(function (r, a) {
        a.forEach(function (b, i) {
          r[i] = (r[i] || 0) + b;
        });
        return r;
      }, []);
      return Object.assign({}, state, {
        points: result
      })
    case 'INCREMENT_RIGHT_ANSWERS':
      return Object.assign({}, state, {
        rightAnswers: state.rightAnswers + 1
      });
    case 'UPDATE_CURRENT_QUESTION':
      return Object.assign({}, state, {
        currentQuestion: state.currentQuestion + 1
      });
    case 'MARK_CATEGORY_SELECTED':
      return Object.assign({}, state, {
        categorySelected: true
      });
    case 'RESET_GAME':
      return Object.assign({}, initialState);
    case 'SET_PLAYER_NUM':
      return Object.assign({}, state, {
        numberOfPlayers: +action.numberOfPlayers
      });
    case 'SET_QUESTION_NUM':
      return Object.assign({}, state, {
        numberOfQuestions: action.numberOfQuestions
      });
    case 'SET_CATEGORY':
      return Object.assign({}, state, {
        category: action.category
      });
    default:
      return state;
  }
};
