import { useState, useEffect } from 'react';
import './App.css';
import Display from './components/Display';
import Header from './components/Header';
import { speak } from './utils/audio';

function App() {
  const [letters, setLetters] = useState('');
  const [wordList, setWordList] = useState(new Set());
  // Below state is only needed to add visual feedback to display a different 
  // color for matched word inside display component.
  const [matchedWord, setMatchedWord] = useState('');

  useEffect(() => {
    const fetchWords = async () => {
      try {
        // Fetching the words list async to avoid blocking initial page load
        const response = await fetch('/words.json');
        const words = await response.json();
        // Choice of DS is explained further in Readme
        setWordList(new Set(words));
      } catch (error) {
        console.error("Failed to load word list:", error);
      }
    };
    fetchWords();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Handle letter keys only. Other keys won't do anything
      if (event.key.match(/^[a-zA-Z]$/)) {
        // We will only show capital letters to keep learning simple
        const typedLetter = event.key.toUpperCase();
        const newLetters = letters + typedLetter;
        setLetters(newLetters);
        // Audio library says "Capital G" for a capital G. 
        // So we pass lowercase to just pronounce "G"
        speak(event.key.toLowerCase()); 

        // Check if the new string is a word
        if (wordList.has(newLetters)) {
          setMatchedWord(newLetters);
          speak(newLetters);
        } else {
          setMatchedWord(''); // It's not a word, so clear any previous match
        }
      }
      // Handle backspace
      else if (event.key === 'Backspace') {
        const newLetters = letters.slice(0, -1);
        setLetters(newLetters);

        // Re-check if the shortened string is a valid word
        if (wordList.has(newLetters)) {
          setMatchedWord(newLetters);
          speak(newLetters);
        } else {
          setMatchedWord('');
        }
      }
      // Handle clearing the word
      else if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault(); // prevent space from scrolling
        setLetters('');
        setMatchedWord('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [letters, wordList]); // Attaching wordList in this hook as its fetched async. When setWordList updates, this effect should rerun .

  return (
    <div className="App">
      <Header />
      <Display letters={letters} matchedWord={matchedWord} />
    </div>
  );
}

export default App;

