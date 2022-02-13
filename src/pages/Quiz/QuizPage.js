import React, { useEffect, useState } from "react";
import classes from "./QuizPage.module.css";

function QuizPage(props) {
  const [options, setOptions] = useState();
  const [currQuestion, setQurrQuestion] = useState(0);

  useEffect(() => {
    console.log(props.questions)
    setOptions(
      props.questions && Object.values(props.questions[currQuestion]?.answers)
    );
       
       return ()=> {
        console.log(options); 
      } 
  }, [props.questions,options]);

  return (
    <div className={classes.quizPage}>
      <h1>WELCOME: {props.name}</h1>
      {props.questions ? (
        <div>
          <div className={classes.score}>
            <span>CATEGORY: {props.questions[currQuestion].category}</span>
            <span>SCORE: {props.score}</span>
          </div>
          <div className={classes.question}>
            <h1>Question {currQuestion + 1}</h1>
            <h1>{props.questions[currQuestion].question}</h1>
            <div className={classes.question_options}>
              {props.questions &&
                props.questions[currQuestion].answers.answer_a && (
                  <button>
                    {props.questions[currQuestion].answers.answer_a}
                  </button>
                )}
              {props.questions &&
                props.questions[currQuestion].answers.answer_b && (
                  <button>
                    {props.questions[currQuestion].answers.answer_b}
                  </button>
                )}
              {/* {props.questions && options.map((e) => <button>{e}</button>)} */}
              {props.questions &&
                props.questions[currQuestion].answers.answer_d && (
                  <button>
                    {props.questions[currQuestion].answers.answer_d}
                  </button>
                )}
              {props.questions &&
                props.questions[currQuestion].answers.answer_e && (
                  <button>
                    {props.questions[currQuestion].answers.answer_e}
                  </button>
                )}
              {props.questions &&
                props.questions[currQuestion].answers.answer_f && (
                  <button>
                    {props.questions[currQuestion].answers.answer_f}
                  </button>
                )}
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
