import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Color from "../constants/Color";
import { Button } from "@mui/material";
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
}));

const Header = (props) => {
  const classes = useStyles();
  let history = useHistory();

  function handleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className={classes.header}>
      <div className={classes.headerTitle}>Pkm Effect</div>
      <div className={classes.randomAssBlackLine}></div>
      <div className={classes.headerContent}>
        <Button onClick={() => handleClick("typeEffect")}>Type Effect</Button>
        <Button onClick={() => handleClick("info")}>Info</Button>
      </div>
    </div>
  );
};

export default Header;
