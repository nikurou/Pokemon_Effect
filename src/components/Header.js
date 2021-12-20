import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Color from "../constants/Color";
import { Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

/* Serve as a Title + NavBar 
    - Team
    - Type Effectiveness
    - Pokedex
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
  blackLine: {
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
    fontSize: "0.7em",
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
    transition: "0.5s",
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
  let history = useHistory(); //routing

  // Keeps track of which tab is currently active, by default "typeEffect" tab.
  // Used to determine which <button> to apply "activeButton" styling to
  // Always set activetab to current pathname
  const [activeTab, setActiveTab] = useState(useLocation().pathname.slice(1));

  // Change the page routing to show $path page
  function handleClick(path) {
    history.push(`/${path}`);
    setActiveTab(path);
  }

  return (
    <div className={classes.header}>
      <div className={classes.headerTitle}>Pokémon Effect</div>
      <div className={classes.blackLine}></div>
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
          Pokédex
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
