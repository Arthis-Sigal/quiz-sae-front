// src/Quiz.jsx
import React, { useState, useEffect, useRef } from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TableauDesScores from './TableauDesScores';

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

  const handleScore = () => {
    setAfficheScore(true);
  }

const handleHome = () => {
    setAfficheScore(false);
}

  return (
    
        <div className="container">
    {
        !start &&

        <div className="row my-4">
        <div className="col text-center">
            <img src="src/image/logoFCF.png" alt="Logo de la ligue" width={"185px"} />
        </div>
        </div>
    }
    
    <div className="row">
      <div className="col">
      <div className="my-4 p-4" style={{ height: "70vh"}}>
      {!start && !afficheScore && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1 style={{ fontFamily: "Opti Agency Gothic", color: "#FFFFFF", fontSize: "200px", marginBottom: 0}}>TIR AU QUIZ</h1>
          <h2 style={{ fontFamily: 'Opti Agency Gothic', color: '#FFFFFF', fontSize: "50px" }}>Marque un maximum de but</h2>
          <button className="btn btn-lg mt-5" style={{ backgroundColor: '#C2272D', color: '#fff', width: "40%", height: "100px", fontSize: "2.3em" }} onClick={() => shuffle()}>
            Commencer
          </button>
            <button className="btn btn-lg mt-5" style={{ backgroundColor: '#9E9FA3', color: '#fff', width: "40%", height: "100px", fontSize: "2.3em" }} onClick={() => handleScore()}>
                Tableau des scores
            </button>
        </div>
      )}
        { afficheScore && (
            <>
                <TableauDesScores scores={scores} />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <button className="btn btn-lg mt-5" style={{ backgroundColor: '#C1272D', borderColor: '#C1272D', color: '#fff', width: "20%"}} onClick={() => handleHome()}>
                        Home
                    </button>
                </div>
            </>
        )}
      {!finish && start && (
        <form onSubmit={handleSubmit}>
        <div className="text-center" style={{ backgroundColor: "#C2272D", width: "65vw", height: "25vh", borderRadius: "15px", fontFamily: "Lilita One", color: "#FFFFFF", padding: "1em", margin: "0 auto 2em auto", fontSize: "1.2rem"}}>
          <h4 style={{fontSize: "2em"}}>
            Question : {questionCount + 1} / {totalQuestions - 1}
          </h4>
          <div className='mt-3' style={{display: "flex", justifyContent: "space-around"}}>
            <p style={{fontSize: "1.4em"}}><AccessTimeOutlinedIcon /> {timerMinute} : {timerSecond}</p>
            <p style={{fontSize: "1.4em"}}>Score : {score}</p>

          </div>

          <label style={{fontSize: "2em"}}>
              {questions.questions[question].question}
        </label>
        </div>
  
        <div>
          <div className="form-group" style={{ textAlign: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
              {questions.questions[question].choices.map((choice, index) => (
                <button
                  key={index}
                  type="button"
                  className={`btn btn-lg btn-block mb-2 mt-2 ${value === choice ? 'btn-primary' : 'btn-outline-dark'}`}
                  onClick={() => handleRadioChange(choice)}
                  style={{
                    fontFamily: 'Barlow',
                    backgroundColor: value === choice ? '#9E9FA3' : '#FFFFFF',
                    color: value === choice ? '#fff' : '#000000',
                    borderColor: '#000000',
                    width: "100%",
                    height: "200px",
                    fontSize: "3em"
                  }}
                >
                  {currentQuestion.type === 'image' ? (
                    <img src={choice} alt={`Choice ${index + 1}`} style={{ width: "20%" }} />
                  ) : (
                    choice
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className='text-center'>
            <button
                className="btn btn-lg btn-block"
                style={{ backgroundColor: '#C1272D', borderColor: '#C1272D', color: '#fff', width: "20%"}}
                type="submit"
            >
                Vérifier
            </button>

          </div>

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
      </div>
    </div>
  </div>

    
  );

}

export default Quiz;
