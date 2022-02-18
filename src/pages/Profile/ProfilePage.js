import React from "react";
import { Link } from "react-router-dom";
import classes from './ProfilePage.module.css'

function ProfilePage(props) {
  function reset(params) {
    props.setScore(0);
    props.setName('');
  }

  return (
    <div className={classes.profile}>
      <h1>THANKS FOR PLAYING {props.name}</h1>
        <h1>YOUR SCORE IS {props.score}
      </h1>
      <Link to='/'><button onClick={reset}>Play Again</button></Link>
    </div>
  );
}

export default ProfilePage;
