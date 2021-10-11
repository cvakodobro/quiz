
const checkResponse = (response) => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
  }
  return response.json();
};

export const getSession = () => {
  return fetch(`https://opentdb.com/api_token.php?command=request`)
    .then(checkResponse)
    .catch((err) => {
      throw new Error(`fetching session token failed ${err}`);
    });
};

export const getQuiz = (categoryId, numOfQuestions, sessionToken) => {
  return fetch(
    `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${categoryId}&token=${sessionToken}&type=multiple`
  )
    .then(checkResponse)
    .catch((err) => {
      throw new Error(`fetching the quiz failed ${err}`);
    });
};
