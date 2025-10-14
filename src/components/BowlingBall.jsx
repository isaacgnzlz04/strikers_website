import React from 'react';
import ballSvg from '../assets/34293845_bowling_ball.svg';

const BowlingBall = ({ className = "", style = {} }) => {
  return (
    <img 
      src={ballSvg} 
      alt="Bowling Ball" 
      className={className}
      style={style}
    />
  );
};

export default BowlingBall;
