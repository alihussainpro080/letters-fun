import React from 'react';
import './Display.css';

const Display = ({ letters, matchedWord }) => {
  const isMatched = letters && letters === matchedWord;

  return (
    <div className="display">
      <h1 className={isMatched ? 'matched' : ''}>
        {letters.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Display;
