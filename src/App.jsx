// src/App.jsx
import React, { useState } from 'react';
import Quiz from './Quiz';
import { jsQuizz } from './constants';
import TableauDesScores from './TableauDesScores';

function App() {
  const [scores, setScores] = useState([]);
  const [showQuiz, setShowQuiz] = useState(true);

  const handleRestart = () => {
    setShowQuiz(false);
    setTimeout(() => setShowQuiz(true), 100); // This is a trick to re-mount the Quiz component
  };

  return (
    <div className="container" style={{ backgroundColor: 'hsl(100deg 1.94% 69.61%)', minHeight: '100vh' }}>
      <div className="row my-4">
        <div className="col text-center">
          <img src="https://www.fedcalfoot.com/photo/iphone_titre_27147511.png?v=1552033404" alt="Logo de la ligue" style={{ maxHeight: '150px' }} />
          <h1 className="my-4" style={{ fontFamily: 'Opti Agency Gothic', color: '#000000' }}>QUIZ FOOTBALL</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TableauDesScores scores={scores} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {showQuiz && <Quiz questions={jsQuizz} setScores={setScores} handleRestart={handleRestart} />}
        </div>
      </div>
    </div>
  );
}

export default App;
