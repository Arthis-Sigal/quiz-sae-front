// src/Quiz.jsx
import React, { useState, useEffect, useRef } from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const Quiz = ({ questions, setScores, handleRestart }) => {
  const [value, setValue] = useState('');
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const totalQuestions = questions.questions.length;
  const [finish, setFinish] = useState(false);
  const [start, setStart] = useState(false);
  const [timerSecond, setTimerSecond] = useState(0);
  const [timerMinute, setTimerMinute] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const usedQuestions = useRef([]);

  const handleRadioChange = (choice) => {
    setValue(choice);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === questions.questions[question].answer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    shuffle();
    if (currentQuestion + 1 === totalQuestions) {
      setFinish(true);
      clearInterval();
    }
  };

  useEffect(() => {
    if (finish || !start) {
      return;
    }
    const interval = setInterval(() => {
      setTimerSecond((prev) => prev + 1);
      if (timerSecond === 59) {
        setTimerSecond(0);
        setTimerMinute((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [start, finish, timerSecond]);

  function shuffle() {
    if (start === false) setStart(true);
    let questionNumber = Math.floor(Math.random() * questions.questions.length);
    if (usedQuestions.current.includes(questionNumber)) {
      shuffle();
    } else {
      usedQuestions.current.push(questionNumber);
      setQuestion(questionNumber);
    }
    if (usedQuestions.current.length === questions.questions.length) {
      setFinish(true);
      clearInterval();
    }
  }

  const [formData, setFormData] = useState({
    name: '',
    firstname: '',
    contact: '',
    score: score,
    rgpd: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dataToServer = (e) => {
    e.preventDefault();
    const newScore = {
      name: `${formData.firstname} ${formData.name}`,
      score: score,
      time: `${timerMinute} : ${timerSecond}`
    };
    setScores((prevScores) => [...prevScores, newScore]);
    handleRestart(); // Call the restart function after saving the score
  };

  return (
    <div className="my-4 p-4 rounded bg-light">
      {!start && (
        <div className="text-center">
          <h2 style={{ fontFamily: 'Opti Agency Gothic', color: '#C1272D' }}>Relevez le défi en répondant à ce quiz !</h2>
          <button className="btn btn-lg" style={{ backgroundColor: '#C1272D', borderColor: '#C1272D', color: '#fff' }} onClick={() => shuffle()}>
            Commencer
          </button>
        </div>
      )}
      {!finish && start && (
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <h4 style={{ fontFamily: 'Barlow', color: '#000000' }}>Question : {currentQuestion + 1} / {totalQuestions}</h4>
            <p><AccessTimeOutlinedIcon /> {timerMinute} : {timerSecond}</p>
            <p>Score : {score}</p>
          </div>
          <div>
            <div className="form-group">
              <label style={{ fontFamily: 'Barlow', color: '#000000' }}>{questions.questions[question].question}</label>
              <div>
                {questions.questions[question].choices.map((choice, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`btn btn-lg btn-block mb-2 ${value === choice ? 'btn-primary' : 'btn-outline-dark'}`}
                    onClick={() => handleRadioChange(choice)}
                    style={{ fontFamily: 'Barlow', backgroundColor: value === choice ? '#9D9FA2' : 'transparent', color: value === choice ? '#fff' : '#000000', borderColor: '#000000' }}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn btn-lg btn-block" style={{ backgroundColor: '#C1272D', borderColor: '#C1272D', color: '#fff' }} type="submit">Vérifier</button>
          </div>
        </form>
      )}
      {finish && (
        <div className="text-center">
          <div className="alert" style={{ backgroundColor: '#9D9FA2', borderColor: '#9D9FA2', color: '#fff' }}>
            Félicitations ! Vous avez terminé le quiz.
          </div>
          <p>Score : {score}</p>
          <p><AccessTimeOutlinedIcon /> {timerMinute} : {timerSecond}</p>
          <form onSubmit={dataToServer}>
            <div className="form-group">
              <label htmlFor="name" style={{ fontFamily: 'Barlow', color: '#000000' }}>Nom</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="firstname" style={{ fontFamily: 'Barlow', color: '#000000' }}>Prénom</label>
              <input type="text" className="form-control" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="contact" style={{ fontFamily: 'Barlow', color: '#000000' }}>Email/Téléphone</label>
              <input type="text" className="form-control" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rgpd" name="rgpd" checked={formData.rgpd} onChange={(e) => setFormData({ ...formData, rgpd: e.target.checked })} />
              <label className="form-check-label" htmlFor="rgpd" style={{ fontFamily: 'Barlow', color: '#000000' }}>J'accepte les conditions d'utilisation</label>
            </div>
            <button className="btn btn-lg btn-block" style={{ backgroundColor: '#C1272D', borderColor: '#C1272D', color: '#fff' }} type="submit">Enregistrer</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Quiz;
