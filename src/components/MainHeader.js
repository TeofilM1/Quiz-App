import React from "react";
import { Link } from "react-router-dom";
import classes from "./MainHeader.module.css";

function MainHeader(props) {
  return (
    <div className={classes.nav}>
      <Link to="/">PROGRAMING QUIZ APP</Link>
      <hr/>
    </div>
  );
}

export default MainHeader;
