// src/App.jsx
import React, { useState } from 'react';
import Quiz from './Quiz';
import { jsQuizz } from './constants';
import './fonts.css';


function App() {
  const [scores, setScores] = useState([]);
  const [showQuiz, setShowQuiz] = useState(true);

  const handleRestart = () => {
    setShowQuiz(false);
    setTimeout(() => setShowQuiz(true), 100); // This is a trick to re-mount the Quiz component
  };

  return (
    <>

    {showQuiz && <Quiz questions={jsQuizz} setScores={setScores} handleRestart={handleRestart} />}
    </>
  );
}

export default App;
