export const speak = (text, options = {}) => {
  const utterance = new SpeechSynthesisUtterance(text);
  
  if (options.pitch) {
    utterance.pitch = options.pitch;
  }
  if (options.rate) {
    utterance.rate = options.rate;
  }

  speechSynthesis.speak(utterance);
};
