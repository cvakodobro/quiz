export const incrementStep = () => {
  return {
    type: 'INCREMENT_STEP'
  };
};

export const decrementStep = () => {
  return {
    type: 'DECREMENT_STEP'
  };
};

export const setQuizQuestions = data => {
  return {
    type: 'SET_QUIZ_QUESTIONS',
    quizData: data
  };
};

export const initPlayers = () => {
  return {
    type: 'INIT_PLAYERS_POINTS'
  };
};

export const addPoints = data => {
  return {
    type: 'ADD_POINTS',
    points: data
  };
};


export const incrementRightAnswers = () => {
  return {
    type: 'INCREMENT_RIGHT_ANSWERS'
  };
};

export const updateCurrentQuestion = currentQuestion => {
  return {
    type: 'UPDATE_CURRENT_QUESTION',
    currentQuestion
  };
};

export const markCategorySelected = () => {
  return {
    type: 'MARK_CATEGORY_SELECTED'
  };
};

export const setNumberOfPlayers = data => {
  return {
    type: 'SET_PLAYER_NUM',
    numberOfPlayers: data
  };
};

export const setNumberOfQuestions = data => {
  return {
    type: 'SET_QUESTION_NUM',
    numberOfQuestions: data
  };
};

export const setCategory = data => {
  return {
    type: 'SET_CATEGORY',
    category: data
  };
};

export const resetGame = () => {
  return {
    type: 'RESET_GAME'
  };
};
