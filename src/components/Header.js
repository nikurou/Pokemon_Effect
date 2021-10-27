import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Color from "../constants/Color";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

/* Serve as a Title + NavBar 
    - Type Effectiveness
    - Info 
*/
const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "yellow",
  },
  headerTitle: {
    backgroundColor: Color.headerTitle,
    color: Color.primaryColor,
    paddingTop: "0.4em",
    paddingBottom: "0.4em",
    textAlign: "center",
    fontSize: "2em",
    width: "100%",
  },
  randomAssBlackLine: {
    backgroundColor: "black",
    width: "100%",
    height: "0.3em",
  },
  headerContent: {
    backgroundColor: Color.headerContent,
    display: "flex",
    justifyContent: "center",
  },
  button: {
    color: Color.blackText,
    transition: "0.5s",
    "& :hover , &$focusVisible": {
      color: Color.redText,
      fontWeight: 550,
      "&:hover $buttonLine": { backgroundColor: Color.redText, width: "100%" },
    },
  },
  activeButton: {
    color: Color.redText,
    fontWeight: 550,
    "& $buttonLine": { backgroundColor: Color.redText, width: "100%" },
  },
  buttonLine: {
    height: 3,
    width: 30,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: -2,
    marginRight: "50%",
    marginLeft: "50%",
    transition: "0.2s",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [activeTab, setActiveTab] = useState("typeEffect");

  // Route to path page
  function handleClick(path) {
    history.push(`/${path}`);
    setActiveTab(path);
  }

  return (
    <div className={classes.header}>
      <div className={classes.headerTitle}>Pkm Effect</div>
      <div className={classes.randomAssBlackLine}></div>
      <div className={classes.headerContent}>
        <Button
          className={
            activeTab === "team" ? classes.activeButton : classes.button
          }
          onClick={() => handleClick("team")}
        >
          My Team
          <span className={classes.buttonLine} />
        </Button>
        <Button
          className={
            activeTab === "typeEffect" ? classes.activeButton : classes.button
          }
          onClick={() => handleClick("typeEffect")}
        >
          Type Effect
          <span className={classes.buttonLine} />
        </Button>
        <Button
          className={
            activeTab === "pokedex" ? classes.activeButton : classes.button
          }
          onClick={() => handleClick("pokedex")}
        >
          Pokedex
          <span className={classes.buttonLine} />
        </Button>
        <Button
          className={
            activeTab === "info" ? classes.activeButton : classes.button
          }
          onClick={() => handleClick("info")}
        >
          Info
          <span className={classes.buttonLine} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
