import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Color from "../constants/Color";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    backgroundColor: Color.accentColor,
    color: Color.lightgray,
    flexDirection: "column",
    borderRadius: "0.5rem",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "16em",
    minWidth: "15em",
  },
  cardTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  cardBottom: {
    display: "flex",
    justifyContent: "flex-end",
    width: "90%",
  },
  cardImage: {
    "& $img": {
      height: "10em",
      width: "10em",
    },
  },
}));

const Card = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <div className={classes.cardTop}>
        <h3>{props.title}</h3>
        <p> {props.id}</p>
      </div>
      <div className={classes.cardImage}>
        <img src={props.icon} alt="spriteIcon"></img>
      </div>
      <div className={classes.cardBottom}>
        <p> {props.types}</p>
      </div>
    </div>
  );
};

export default Card;
