import { Start } from '@mui/icons-material';
import {Box, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText, FormLabel, TextField, Checkbox  } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import * as React from 'react';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';


const Quiz = ({ questions }) => {
    const [value, setValue] = React.useState('');
    const [question, setQuestion] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const totalQuestions = questions.questions.length;
    const [finish, setFinish] = React.useState(false);
    const [start, setStart] = React.useState(false);
    const [timerSecond, setTimerSecond] = React.useState(0);
    const [timerMinute, setTimerMinute] = React.useState(0);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const usedQuestions = React.useRef([]);

  
    const handleRadioChange = (event) => {
      setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (value == questions.questions[question].answer) {
          setScore(score + 1);
          setCurrentQuestion(currentQuestion + 1);
            shuffle();
          if (currentQuestion + 1 === totalQuestions) {
            setFinish(true);
            //on stop le timer
            clearInterval();
          }
          
        } else {
            setCurrentQuestion(currentQuestion + 1);
            shuffle();
          if (currentQuestion + 1 === totalQuestions) {
            setFinish(true);
            //on stop le timer
            clearInterval();
          }
         
        }
      };

      //toute les seconde on ajoute +1 au timer
    useEffect(() => {
        if(finish || !start){
            return;
        }
     const interval = setInterval(() => {
        setTimerSecond(timerSecond + 1)
        if(timerSecond === 59){
            setTimerSecond(0);
            setTimerMinute(timerMinute + 1)
        }
        }, 1000);
        return () => clearInterval(interval);
    });
    


    function shuffle() {
    if (start === false) 
        setStart(true);
    //on tire un chiffre au hasard,
    let questionNumber = Math.floor(Math.random() * questions.questions.length);
        //console.log(questionNumber);
        setQuestion(questionNumber);
    //on crée un tableau pour stoquer le questionNumber
 
    //console.log(usedQuestions.current);


    //on verifie si le question number est dans le tableau
    if(usedQuestions.current.includes(questionNumber)){
        shuffle(questionNumber);
    }else{
        //on push dans le tableau sans écrazer les valeurs
        usedQuestions.current.push(questionNumber);
        //on set la question
        //setQuestion(questionNumber);
        //console.log(usedQuestions);
    }
    //on verifie si le tableau est égale au nombre de question
    if(usedQuestions.current.length === questions.questions.length){
        setFinish(true);
        //on stop le timer
        clearInterval();
    } 
    //console.log(usedQuestions);
    
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
    console.log(JSON.stringify({ formData }));
    // Envoi de la requête POST à l'API
    fetch('http://127.0.0.1:8000/api/new', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formData })

    })
    console.log(body)
    .then(response => {
    if (!response.ok) {
        throw new Error('Erreur lors de la requête');
    }
    return response.json();
    })
    .then(data => {
    console.log('Réponse de l\'API :', data);
    // Effectuez des actions supplémentaires en fonction de la réponse de l'API
    })
    .catch(error => {
    console.error('Erreur lors de la requête:', error);
    });
};






    return (
        <Box>
            <Typography sx={{
                textAlign: 'center',
                fontSize: '3em',
                margin: '1em',
                textTransform: 'uppercase',
            
            }}>quiz football</Typography>

            { //-----------------------------------------------------------------------------------Début du quiz
                !start &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '40vw',
                    margin: 'auto',
                    textAlign: 'center',
                    marginTop: '15em',
                }}>
                    <Typography sx={{
                        fontSize: '2em',
                        margin: '1em',
                    }}>Relevez le défis en répondant à ce quiz !</Typography>
                    <Button sx={{
                        margin: 'auto',
                        width: '50%',
                        fontSize: '1.5em',
                    }}
                    onClick={() => shuffle()}>Commencer</Button>
                </Box>
            }

            {// -----------------------------------------------------------------------------------Quizz
                !finish && start &&
                <Box component='form' onSubmit={handleSubmit} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '40vw',
                    margin: 'auto',
                    backgroundColor: '#f5f5f5',
                    padding: '2em',
                    borderRadius: '10px',

                }}>
                    <Typography sx={{
                        textAlign: 'center',
                        fontSize: '2em',
                        margin: '1em',
                        textTransform: 'capitalize',
                    }}>question : {currentQuestion + 1} / {totalQuestions - 1 } </Typography>
                    <Box sx={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        "& p": {
                            fontSize: '1.5em',
                        }
                    }}>
                        <Typography sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '20%',
                        }}><AccessTimeOutlinedIcon sx={{marginRight: "0.4em"}} /> {timerMinute} : { timerSecond}</Typography>
                        <Typography sx={{
                            width: '20%',
                        }}>score : {score}</Typography>

                    </Box>
        
                <FormControl sx={{ 
                    m: 3,
                    ".formCheck": {
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin: 0,
                        '& .MuiTypography-root': {
                            border: '1px solid #000000',
                            textAlign: 'center',
                            borderRadius: '10px',
                            fontSize: '1.5em',
                            padding: '0.4em',
                            textTransform: 'capitalize',
                            width: '70%',
                            margin: 0,
                            "&:hover": {
                                backgroundColor: '#000000',
                                color: '#ffffff',
                                cursor: 'pointer',
                            },                          
                        },
                        "& .MuiRadio-root": {
                            display: 'none',
                        },
                        "&.selected": {
                            "& .MuiTypography-root": {

                                backgroundColor: '#000000',
                                color: '#ffffff',
                            }

                        },

                    },
                 }}>
                    <FormLabel sx={{
                        fontSize: '1.5em',
                        textAlign: 'center',
                        color: '#000000',
                    }}>{questions.questions[question].question}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-error-radios"
                        name="quiz"
                        value={value}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel
                            className={value === questions.questions[question].choices[0] ? 'selected formCheck' : 'formCheck'}
                            value={questions.questions[question].choices[0]}
                            control={<Radio />}
                            label={questions.questions[question].choices[0]}
                            
                        />
                        <FormControlLabel
                            className={value === questions.questions[question].choices[1] ? 'selected formCheck' : 'formCheck'}
                            value={questions.questions[question].choices[1]}
                            control={<Radio />}
                            label={questions.questions[question].choices[1]}
                        />
                        <FormControlLabel
                            className={value === questions.questions[question].choices[2] ? 'selected formCheck' : 'formCheck'}
                            value={questions.questions[question].choices[2]}
                            control={<Radio />}
                            label={questions.questions[question].choices[2]}
                        />
                        <FormControlLabel
                            className={value === questions.questions[question].choices[3] ? 'selected formCheck' : 'formCheck'}
                            value={questions.questions[question].choices[3]}
                            control={<Radio />}
                            label={questions.questions[question].choices[3]}
                        />
                    </RadioGroup>
                    <Button sx={{ m: "auto", mt: 5, width: "40%", fontSize: "1.5em" }} type="submit" variant="outlined">
                        Vérifier
                    </Button>
                </FormControl>
            </Box>

            }
            { //-----------------------------------------------------------------------------------Fin du quiz
                finish &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '40vw',
                    margin: 'auto',
                    backgroundColor: '#f5f5f5',
                    padding: '2em',
                    borderRadius: '10px',
                
                }}>
                    <Typography sx={{
                        textAlign: 'center',
                        fontSize: '1.5em',
                        textTransform: 'uppercase',

                    }}>Félicitation vous avais atteint la fin du quizz</Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        margin: '1em',

                    }}>
                        <Typography sx={{
                            textAlign: 'center',
                            fontSize: '1.5em',
                            textTransform: 'capitalize',
                        }}>score : {score}</Typography>
                        <Typography sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1.5em',
                            "svg": {
                                marginRight: '0.4em',
                            }

                        
                        }}><AccessTimeOutlinedIcon/> {timerMinute} : { timerSecond}</Typography>


                    </Box>
                    
                    <Typography sx={{
                        textAlign: 'center',
                        fontSize: '1em',
                        margin: '1em',
                        textTransform: 'uppercase',
                    
                    }}>Enregistré votre score</Typography>
                    <FormControl  component="form" onSubmit={dataToServer} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                            "& .MuiTextField-root": {
                                margin: '0.5em',
                            },
                            "& .MuiFormControlLabel-root": {
                                margin: '0.5em',
                            }
                        }}>
                        <TextField id="name" name="name" label="Nom" variant="outlined" required value={formData.name} onChange={handleChange} />
                        <TextField id="firstname" name="firstname" label="Prénom" variant="outlined" required value={formData.firstname} onChange={handleChange} />
                        <TextField id="contact" name="contact" label="Email/Téléphone" variant="outlined" required value={formData.contact} onChange={handleChange} />
                        <FormControlLabel
                            control={<Checkbox checked={formData.rgpd} onChange={(e) => setFormData({ ...formData, rgpd: e.target.checked })} />}
                            label="J'accepte les conditions d'utilisation"
                        />
                        <Button sx={{ m: "auto", mt: 5, width: "40%", fontSize: "1.5em" }} type="submit" variant="outlined">Enregistrer</Button>
                    </FormControl>

                </Box>
            }
        
    

        </Box>
    );
}

export default Quiz;