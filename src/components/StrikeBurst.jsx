import React from 'react';

const StrikeBurst = ({ className = "", style = {} }) => {
  return (
    <svg 
      viewBox="0 0 400 400" 
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue burst rays */}
      <g opacity="0.8">
        {/* Long rays */}
        <polygon
          points="200,200 220,50 240,200"
          fill="#4E98D5"
        />
        <polygon
          points="200,200 350,180 200,220"
          fill="#4E98D5"
        />
        <polygon
          points="200,200 220,350 180,200"
          fill="#4E98D5"
        />
        <polygon
          points="200,200 50,220 200,180"
          fill="#4E98D5"
        />
        
        {/* Diagonal rays */}
        <polygon
          points="200,200 310,90 200,210"
          fill="#4E98D5"
          opacity="0.7"
        />
        <polygon
          points="200,200 310,310 190,200"
          fill="#4E98D5"
          opacity="0.7"
        />
        <polygon
          points="200,200 90,310 200,190"
          fill="#4E98D5"
          opacity="0.7"
        />
        <polygon
          points="200,200 90,90 210,200"
          fill="#4E98D5"
          opacity="0.7"
        />
      </g>
      
      {/* Red accent rays */}
      <g opacity="0.6">
        <polygon
          points="200,200 235,70 205,200"
          fill="#96333C"
        />
        <polygon
          points="200,200 330,165 200,235"
          fill="#96333C"
        />
        <polygon
          points="200,200 165,330 235,200"
          fill="#96333C"
        />
        <polygon
          points="200,200 70,235 200,165"
          fill="#96333C"
        />
      </g>
    </svg>
  );
};

export default StrikeBurst;
