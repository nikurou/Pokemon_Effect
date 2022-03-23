import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Color from "../constants/Color";

/*
 * A small square text box that mirrors the design philosophy of the type readouts in game
 *
 * @params: String type
 */

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: Color.bugType,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginRight: "1em",

    "& $p": {
      backgroundColor: "red",
    },
  },
  typeBox: {
    backgroundColor: Color.dragonType,
    borderRadius: "20%",
    paddingLeft: ".5em",
    paddingRight: ".5em",
    color: Color.primaryColor,
  }, 
}));

const TypeDisplay = (relationArray) => {
  const classes = useStyles();

  const displayTags = (relationArray) => {
    return "test";
  };

  useEffect(() => {}, [relationArray]);
  return (
    <div className={classes.container}>
      <div className={classes.typeBox}>ele</div>
      <p>ele</p>
      <p>ele</p>
      <p>ele</p>
      <p>ele</p>
      <p>ele</p>
      <p>ele</p>
      <p>ele</p>
      <p>ele</p>
      <p>ele</p>
      <p>ele</p>
      <p>ele</p>
      <p>ele</p>
      <p>ele</p>
    </div>
  );
};

export default TypeDisplay;
