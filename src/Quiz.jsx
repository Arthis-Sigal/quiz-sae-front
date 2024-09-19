// src/Quiz.jsx
import React, { useState, useEffect, useRef } from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TableauDesScores from './TableauDesScores';
import './Quiz.css';  // Importation du fichier CSS

const Quiz = ({ questions, handleRestart }) => {
  const [value, setValue] = useState('');
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const totalQuestions = questions.questions.length;
  const [finish, setFinish] = useState(false);
  const [start, setStart] = useState(false);
  const [timerSecond, setTimerSecond] = useState(0);
  const [timerMinute, setTimerMinute] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions.questions[question]);
    const [questionCount, setQuestionCount] = useState(0);
  const usedQuestions = useRef([]);
  const [afficheScore, setAfficheScore] = useState(false);
  const [scores, setScores] = useState([]);



    //style body
    document.body.style.overflow = "hidden";


  const handleRadioChange = (choice) => {
    setValue(choice);
  };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (value == questions.questions[question].answer) {
          setScore(score + 1);
          setQuestionCount(questionCount + 1);
            shuffle();
          if (questionCount + 1 === totalQuestions) {
            setFinish(true);
            //on stop le timer
            clearInterval();
          }
          
        } else {
            setQuestionCount(questionCount + 1);
            shuffle();
          if (questionCount + 1 === totalQuestions) {
            setFinish(true);
            //on stop le timer
            clearInterval();
          }
         
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
        setCurrentQuestion(questions.questions[questionNumber]);

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
    newletters: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dataToServer = async (e) => {
    e.preventDefault();
  
    const newScore = {
      name: formData.name,
      firstname: formData.firstname,
      contact: formData.contact,
      score: score.toString(),
      time: `${timerMinute}:${timerSecond}`,
      rgpd: formData.rgpd,
      newletters: formData.newletters,
    };
  
    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newScore),
      });
  
      if (response.ok) {
        handleRestart(); // Redémarre le quiz après avoir sauvegardé le score
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleScore = () => {
    setAfficheScore(true);
  }

const handleHome = () => {
    setAfficheScore(false);
}

 return (
    <div className="container">
      {!start && !afficheScore && (
        <div className="row my-sm-4 my-md-0">
          <div className="col logo">
            <img src="src/image/logoFCF.png" alt="Logo de la ligue" />
          </div>
        </div>
      )}

      <div className="row">
        <div className="col">
          <div className="my-4 p-4" style={{ height: "70vh" }}>
            {!start && !afficheScore && (
              <div className="text-center">
                <h1 className="quiz-title">TIR AU QUIZ</h1>
                <h2 className="quiz-subtitle">Marque un maximum de but</h2>
                <button className="quiz-btn-start mt-5" onClick={() => shuffle()}>
                  Commencer
                </button>
                <button className="quiz-btn-score mt-5" onClick={() => handleScore()}>
                  Tableau des scores
                </button>
              </div>
            )}

            {afficheScore && (
              <>
                <TableauDesScores scores={scores} />
                <div className="text-center">
                  <button className="quiz-btn-home mt-5" onClick={() => handleHome()}>
                    Home
                  </button>
                </div>
              </>
            )}

            {!finish && start && (
              <form onSubmit={handleSubmit}>
                <div className="question-container">
                  <h4>Question : {questionCount + 1} / {totalQuestions - 1}</h4>
                  <div className='question-timer-score mt-3'>
                    <p><AccessTimeOutlinedIcon /> {timerMinute} : {timerSecond}</p>
                    <p>Score : {score}</p>
                  </div>
                  <label style={{ fontSize: "2em" }}>
                    {questions.questions[question].question}
                  </label>
                </div>

                <div className="question-form">
                  {questions.questions[question].choices.map((choice, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`quiz-btn-choice mb-2 mt-2 ${value === choice ? 'quiz-btn-choice-selected' : 'quiz-btn-choice'}`}
                      onClick={() => handleRadioChange(choice)}
                    >
                      {currentQuestion.type === 'image' ? (
                        <img src={choice} alt={`Choice ${index + 1}`} style={{ width: "20%" }} />
                      ) : (
                        choice
                      )}
                    </button>
                  ))}
                </div>
                <div className='text-center'>
                  <button
                    className="quiz-btn-submit mt-4"
                    type="submit"
                  >
                    Vérifier
                  </button>
                </div>
              </form>
            )}

            {finish && (
              <div className="finish-container">
                <div className="alert finish-alert">
                  Félicitations ! Vous avez terminé le quiz, incrivez vous pour apparaitre au classement.
                </div>
                <div className='finish-timer-score mt-3'>
                  <p><AccessTimeOutlinedIcon /> {timerMinute} : {timerSecond}</p>
                  <p>Score : {score}</p>
                </div>
                <form onSubmit={dataToServer} className="finish-form">
                  <div className="form-group">
                    <label htmlFor="name">Nom*</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstname">Prénom*</label>
                    <input type="text" className="form-control" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact">Email/Téléphone*</label>
                    <input type="text" className="form-control" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="rgpd" name="rgpd" checked={formData.rgpd} onChange={(e) => setFormData({ ...formData, rgpd: e.target.checked })} required />
                    <label className="form-check-label" htmlFor="rgpd">J'accepte les <a href="#">termes et conditions*</a></label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="newletters" name="newletters" checked={formData.newletters} onChange={(e) => setFormData({ ...formData, newletters: e.target.checked })} />
                    <label className="form-check-label" htmlFor="newletters">J'accepte que la FCF m'envoie des informations</label>
                  </div>
                  <div className='text-center'>
                    <button
                      className="quiz-btn-submit mt-4"
                      type="submit"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

}

export default Quiz;
