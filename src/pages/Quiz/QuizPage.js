import React, { useEffect, useState } from "react";
import classes from "./QuizPage.module.css";
import axios from "axios";

function QuizPage(props) {
  const [questions, setQuestions] = useState("");
  const [score, setScore] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(0);
  const appKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchQuestionsHandler = async (category, difficulty) => {
      const { data } = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=${appKey}&category=${category}&difficulty=${difficulty}&limit=10`
      );
      setQuestions(data);
    };
    fetchQuestionsHandler(props.category, props.difficulty);
  }, [props.category, props.difficulty,appKey]);
  console.log(questions);

  function nextQuestion() {
      setScore(score + 1)
      setCurrQuestion(currQuestion + 1);
  }

  return (
    <div className={classes.quizPage}>
      <h1>WELCOME: {props.name}</h1>
      {questions ? (
        <div>
          <div className={classes.score}>
            <span>CATEGORY: {questions[currQuestion].category}</span>
            <span>SCORE: {score}</span>
          </div>
          <div className={classes.question}>
            <h1>Question {currQuestion + 1}</h1>
            <h1>{questions[currQuestion].question}</h1>
            <div className={classes.question_options}>
              {Object.values(questions[currQuestion].answers)
                .filter(options => options!== null)
                .map((opt) => (
                  <button onClick={nextQuestion} key={Math.random()}>
                    {opt && opt}
                  </button>
                ))}
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
