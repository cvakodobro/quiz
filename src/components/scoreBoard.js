import React from 'react';

const Score = ({ points }) => {

  return (<div className='score-board'>{points.map((el, i) => {
    return (<div className='score' key={i}>{i === 0 ? 'Player' : 'Computer ' + i} : {el}</div>)
  })}</div>)

}

export default Score;