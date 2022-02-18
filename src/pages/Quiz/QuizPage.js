import React, { useEffect, useState } from "react";
import classes from "./QuizPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QuitModal from "../../components/QuitModal";

function QuizPage(props) {
  const navigate = useNavigate();
  const [quit,setQuit] = useState(false)
  const [questions, setQuestions] = useState("");
  const [currQuestion, setCurrQuestion] = useState(0);
  const appKey = process.env.REACT_APP_API_KEY;
  const [answers, setAnswers] = useState();


  useEffect(() => {
    const fetchQuestionsHandler = async (category, difficulty) => {
      const { data } = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=${appKey}&category=${category}&difficulty=${difficulty}&limit=10`
      );
      setQuestions(data);
    };
    fetchQuestionsHandler(props.category, props.difficulty);
  }, [props.category, props.difficulty, appKey]);

  function handleChange(e) {
    const answer = Object.values(questions[currQuestion].answers);
    console.log(answer)
    const correct = Object.values(questions[currQuestion].correct_answers).map((ans) => ans);

    function cor(i) {
      for (const element of correct) {
        if (element === true){
          return element[i]
        }
      }
      }
      
     cor(0)
    const { id, checked } = e.target;
    setAnswers(`${id} is ${checked}`);
    if (checked) {
      setAnswers(`${id} is ${checked}`)
    } else {
    }
   
  }
  function nextQuestion() {
    if (currQuestion < 9) {
     if (answers) {
       setCurrQuestion( currQuestion +1)
       props.setError(false)
       setAnswers("")
     } else{
       props.setError(true)
     }
    } else {
      props.setScore(props.score + 1);
      navigate("/profile");
    }
  }

  function quitPlay(params) {
    if (currQuestion < 6) {
      setQuit(true)
    } else {
      navigate("/profile");
    }
  }

  return (
    <React.Fragment>
      {quit && <QuitModal name={props.name} setQuit={setQuit} setName={props.setName}/>}
      <div className={classes.quizPage}>
        <h2>WELCOME: {props.name}</h2>
        {questions ? (
          <div>
            <div className={classes.score}>
              <span>CATEGORY: {questions[currQuestion].category}</span>
              <span>SCORE: {props.score}</span>
            </div>
            <div className={classes.question}>
              <div className={classes.questions_header}>
                <h2>Question {currQuestion + 1}</h2>
                <h2>{questions[currQuestion].question}</h2>
              </div>
              <div className={classes.question_options}>
                {Object.values(questions[currQuestion]?.answers)
                  .filter((option) => option !== null)
                  .map((opt,i) => (
                    <div className={classes.option} key={opt}>
                      <input
                        className={classes.checkbox}
                        type="checkbox"
                        id={opt}
                        index={i}
                        name={opt}
                        onChange={handleChange}
                      ></input>
                      <label htmlFor={opt}>{opt}</label>
                    </div>
                  ))}
              </div>
              {props.error && <p>Please select answer</p>}
              <div className={classes.questions_actions}>
               
                <button className={classes.actions_quit} onClick={quitPlay}>
                  Quit
                </button>
                <button className={classes.actions_next} onClick={nextQuestion}>
                  Next Question
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading Questions...</p>
        )}
      </div>
    </React.Fragment>
  );
}

export default QuizPage;
