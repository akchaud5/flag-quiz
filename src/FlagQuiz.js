import React, { useState, useEffect } from 'react';

const countries = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'India', flag: '🇮🇳' }
  
];

const FlagQuiz = () => {
  const [currentFlag, setCurrentFlag] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const getRandomCountries = (count, exclude = null) => {
    const available = countries.filter(c => c !== exclude);
    const selected = [];
    while (selected.length < count) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const country = available[randomIndex];
      if (!selected.includes(country)) {
        selected.push(country);
      }
    }
    return selected;
  };

  const setupQuestion = () => {
    const correctCountry = countries[Math.floor(Math.random() * countries.length)];
    const wrongOptions = getRandomCountries(3, correctCountry);
    const allOptions = [...wrongOptions, correctCountry]
      .sort(() => Math.random() - 0.5);

    setCurrentFlag(correctCountry);
    setOptions(allOptions);
  };

  const handleAnswer = (country) => {
    setTotalQuestions(prev => prev + 1);
    if (country === currentFlag) {
      setScore(prev => prev + 1);
    }
    
    if (totalQuestions + 1 >= 10) {
      setGameOver(true);
    } else {
      setupQuestion();
    }
  };

  const restartGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setGameOver(false);
    setupQuestion();
  };

  useEffect(() => {
    setupQuestion();
  }, []);

  const containerStyle = {
    width: '400px',
    padding: '24px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    margin: '20px auto'
  };

  const buttonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '4px',
    width: '45%'
  };

  if (gameOver) {
    return (
      <div style={containerStyle}>
        <div style={{textAlign: 'center'}}>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px'}}>Game Over!</h2>
          <p style={{fontSize: '20px', marginBottom: '16px'}}>Final Score: {score}/10</p>
          <button 
            onClick={restartGame}
            style={buttonStyle}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{textAlign: 'center'}}>
        <p style={{marginBottom: '8px'}}>Score: {score}/{totalQuestions}</p>
        <div style={{fontSize: '96px', marginBottom: '24px'}}>{currentFlag?.flag}</div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px'}}>
          {options.map((country, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(country)}
              style={buttonStyle}
            >
              {country.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlagQuiz;