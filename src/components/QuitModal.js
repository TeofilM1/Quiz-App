import React from "react";
import  ReactDOM  from "react-dom";
import { useNavigate } from "react-router-dom";
import classes from "./QuitModal.module.css";



function Backdrop(props) {
  return (
    <div
      className={classes.backdrop}
      onClick={() => {
        props.setQuit(false);
      }}
    />
  );
}

function Modal(props) {
    return(
<div className={classes.modal}>
        <header className={classes.header}>
          <h2>do you want to quit {props.name}?</h2>
        </header>
        <div className={classes.content}>
          <p>You will lose your score</p>
        </div>
        <footer className={classes.actions}>
          <button
            onClick={() => {
              props.setQuit(true);
              props.setName("");
              props.navigate("/");
            }}
          >
            YES
          </button>
          <button
            onClick={() => {
              props.setQuit(false);
            }}
          >
            NO
          </button>
        </footer>
      </div>
    )
}

function QuitModal(props) {
    const navigate = useNavigate();
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop  setQuit={props.setQuit} />, document.getElementById("backdrop-root"))};
      {ReactDOM.createPortal(<Modal setName={props.setName} name={props.name} setQuit={props.setQuit} navigate={navigate}/>, document.getElementById("modal-root"))};
    </div>
  );
}

export default QuitModal;
