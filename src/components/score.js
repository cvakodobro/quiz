import React from 'react';

const Score = ({ refresh, score }) => {
  const winner = score.indexOf(Math.max(...score))
  return (
    <div className="scoreCard">
      <h1>Winner!</h1>
      <p>{winner === 0 ? 'Player' : 'Computer ' + winner}</p>
      <button className="button question" onClick={refresh}>
        Play Again
      </button>
    </div>
  )
}

export default Score;