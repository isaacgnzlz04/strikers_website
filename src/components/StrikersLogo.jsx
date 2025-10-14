import React from 'react';
import logoSvg from '../assets/0ngbh601.svg';

const StrikersLogo = ({ className = "", showText = true, animated = false }) => {
  return (
    <div className={`strikers-logo ${className}`}>
      <img 
        src={logoSvg} 
        alt="Strikers Bowling Alley Logo" 
        className="w-full h-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default StrikersLogo;
