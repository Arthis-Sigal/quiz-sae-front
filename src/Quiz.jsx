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
    {
        !start && !afficheScore &&

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
          <button className="btn btn-lg mt-5" style={{ backgroundColor: '#C2272D', color: '#fff', width: "40%", height: "100px", fontSize: "2.3em", fontFamily: "Opti Agency Gothic" }} onClick={() => shuffle()}>
            Commencer
          </button>
            <button className="btn btn-lg mt-5" style={{ backgroundColor: '#9E9FA3', color: '#fff', width: "40%", height: "100px", fontSize: "2.3em", fontFamily: "Opti Agency Gothic" }} onClick={() => handleScore()}>
                Tableau des scores
            </button>
        </div>
      )}
        { afficheScore && (
            <>
                <TableauDesScores scores={scores} />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <button className="btn btn-lg mt-5" style={{ backgroundColor: '#C2272D', color: '#fff', width: "40%", height: "100px", fontSize: "2.3em", fontFamily: "Opti Agency Gothic"}} onClick={() => handleHome()}>
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
                style={{ backgroundColor: '#C2272D', color: '#fff', width: "40%", height: "100px", fontSize: "2.3em", fontFamily: "Opti Agency Gothic"}}
                type="submit"
            >
                Vérifier
            </button>

          </div>

        </div>
    
      </form>
      
      )}
      {finish && (
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.4)", width: "80vw", borderRadius: "15px", fontFamily: "Lilita One", color: "#FFFFFF", padding: "2em", margin: "5em auto 0 auto", fontSize: "1.2rem" }}>
          <div className="alert text-center" style={{ backgroundColor: '#9D9FA2', borderColor: '#9D9FA2', color: '#fff', fontSize: "1.3em" }}>
            Félicitations ! Vous avez terminé le quiz, incrivez vous pour apparaitre au classement.
          </div>
          <div className='mt-3' style={{display: "flex", justifyContent: "space-around",  fontSize: "1.2em", fontWeight: "bold", color: '#000000', fontFamily: 'Barlow'}}>
            <p style={{fontSize: "1.4em"}}><AccessTimeOutlinedIcon /> {timerMinute} : {timerSecond}</p>
            <p style={{fontSize: "1.4em"}}>Score : {score}</p>
          </div>
          <form onSubmit={dataToServer} style={{ fontSize: "1.5em", fontWeight: "bold", color: '#000000', fontFamily: 'Barlow'}}>
            <div className="form-group">
              <label htmlFor="name">Nom*</label>
              <input type="text" className="form-control" id="name" name="name" style={{fontSize: "0.8em"}} value={formData.name} onChange={handleChange} required />
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
              <label className="form-check-label" htmlFor="rgpd">J'accepte les conditions d'utilisation*</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="newletters" name="newletters" checked={formData.newletters} onChange={(e) => setFormData({ ...formData, newletters: e.target.checked })} />
              <label className="form-check-label" htmlFor="newletters">J'accepte que la FCF m'envois des information</label>
            </div>
            <div className='text-center'>
            <button
                className="btn btn-lg btn-block mt-4"
                style={{ backgroundColor: '#C2272D', color: '#fff', width: "40%", height: "100px", fontSize: "2em", fontFamily: "Opti Agency Gothic"}}
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
