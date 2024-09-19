// src/App.jsx
import React, { useState } from 'react';
import Quiz from './Quiz';
import { jsQuizz } from './constants';
import './fonts.css';
import './App.css'; // Ajouter ce fichier CSS pour le style personnalisé
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function App() {
  const [scores, setScores] = useState([]);
  const [showQuiz, setShowQuiz] = useState(true);

  const handleRestart = () => {
    setShowQuiz(false);
    setTimeout(() => setShowQuiz(true), 100); // This is a trick to re-mount the Quiz component
  };


  return (
    <div className="app-container">
      <div className="header">
        <button className="btn-home" onClick={handleRestart}><HomeOutlinedIcon/></button>
      </div>
      
      {showQuiz && <Quiz questions={jsQuizz} setScores={setScores} handleRestart={handleRestart} />}
    </div>
  );
}

export default App;
