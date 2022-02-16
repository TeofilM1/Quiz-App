import React, { useEffect, useState } from "react";
import classes from "./QuizPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuizPage(props) {
  const [questions, setQuestions] = useState("");
  const [score, setScore] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(0);
  const appKey = process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();               



  useEffect(() => {
    const fetchQuestionsHandler = async (category, difficulty) => {
      const { data } = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=${appKey}&category=${category}&difficulty=${difficulty}&limit=10`
      );
      setQuestions(data);
    };
    fetchQuestionsHandler(props.category, props.difficulty);
  }, [props.category, props.difficulty, appKey]);

  function nextQuestion() {
    if(currQuestion < 9){
      setCurrQuestion(currQuestion + 1);
    } else {
      
      navigate("/profile");
    }
    
  }

  function quitPlay(params) {}

  return (
    <div className={classes.quizPage}>
      <h2>WELCOME: {props.name}</h2>
      {questions ? (
        <div>
          <div className={classes.score}>
            <span>CATEGORY: {questions[currQuestion].category}</span>
            <span>SCORE: {score}</span>
          </div>
          <div className={classes.question}>
            <div className={classes.questions_header}>
              <h2>Question {currQuestion + 1}</h2>
              <h2>{questions[currQuestion].question}</h2>
            </div>
            <div className={classes.question_options}>
              {Object.values(questions[currQuestion]?.answers)
                .filter((option) => option !== null)
                .map((opt) => (
                  <div className={classes.option}>
                    <input
                      className={classes.checkbox}
                      type="checkbox"
                      id={opt}
                      name={opt}
                    ></input>
                    <label for={opt}>{opt}</label>
                  </div>
                ))}
            </div>
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
  );
}

export default QuizPage;
