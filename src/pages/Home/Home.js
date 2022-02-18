import React, { useState } from "react";
import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const [category, setCategory] = useState("linux");
  const [difficulty, setDifficulty] = useState("easy");

  const navigate = useNavigate();

  const typeCategory = ["", "Linux", "Code", "Docker", "DevOps", "SQL"];
  const typeDifficulty = ["","Easy", "Medium", "Hard"];

  function FormSubmitHandler(event) {
    event.preventDefault();
    if (!props.name || !category || !difficulty) {
      props.setError(true);
      return;
    }else if (props.name || category==="" || difficulty ==="") {
      props.setError(false);
      props.fetchQuestionsHandler(category, difficulty);
      navigate("/quiz");
    } else {
      props.setError(false);
      props.fetchQuestionsHandler(category, difficulty);
      navigate("/quiz");
    }
  }

  return (
    <div className={classes.home}>
      <div className={classes.seatings}>
        <h1>QUIZ SETTINGS</h1>
        {props.error && <h3 className={classes.error}>Please Fill All Fields</h3>}
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
              {typeCategory.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.formControls}>
            <label>Select Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {typeDifficulty.map((dif) => (
                <option key={dif} value={dif}>
                  {dif}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.actions}>
            <button type="submit">Start Quiz</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
