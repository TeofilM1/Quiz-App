import React, { useState } from "react";
import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  function FormSubmitHandler(event) {
    event.preventDefault();
    if (!props.name || !category || !difficulty) {
      setError(true);
      return;
    } else {
      setError(false);
      props.fetchQuestionsHandler(category, difficulty);
      navigate("/quiz");
    }
  }

  return (
    <div className={classes.home}>
      <div className={classes.seatings}>
        <h1>QUIZ SETTINGS</h1>
        {error && <h3 className={classes.error}>Please Fill All Fields</h3>}
        <form onSubmit={FormSubmitHandler} className={classes.form}>
          <div className={classes.formControls}>
            <label>Enter Your Name</label>
            <input
              type="text"
              value={props.name}
              onChange={(e) => props.setUserName(e.target.value)}
            />
          </div>
          <div className={classes.formControls}>
            <label>Select Category</label>
            <select
              id="selectQuiz"
              name="selectQuiz"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="random">Random</option>
              <option value="Linux">Linux</option>
              <option value="code">Code</option>
              <option value="Docker">Docker</option>
              <option value="DevOps">DevOps</option>
              <option value="SQL">SQL</option>
            </select>
          </div>
          <div className={classes.formControls}>
            <label>Select Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          {/* {!userName && <h4>Please Enter Your Name </h4>} */}
          <div className={classes.actions}>
            <button type="submit">Start Quiz</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
