import React from 'react';
import './Header.css';
import { speak } from '../utils/audio';

const Header = () => {
  const instruction = "Hello! Type letters on the keyboard to spell a word. If you spell it right, I'll say the word!";

  const handleSpeak = () => {
    speak(instruction, { pitch: 1.2, rate: 0.9 });
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Letters Fun!</h1>
      </div>
      <p className="instructions-text">{instruction}</p>
      <button onClick={handleSpeak} className="speak-button">
        <span role="img" aria-label="Play Instructions">🔊</span>
      </button>
    </header>
  );
};

export default Header;
