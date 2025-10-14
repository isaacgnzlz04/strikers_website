import React from 'react';
import pinSvg from '../assets/bowling-pin-svgrepo-com.svg';

const BowlingPin = ({ className = "", style = {} }) => {
  return (
    <img 
      src={pinSvg} 
      alt="Bowling Pin" 
      className={className}
      style={style}
    />
  );
};

export default BowlingPin;
