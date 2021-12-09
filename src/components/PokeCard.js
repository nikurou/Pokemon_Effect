import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Color from "../constants/Color";
import axios from "axios";

/*
    Each card should 
        - Display Image Sprite, Name, #ID, Typing
        - Show "Defenses" against their typing.
        - Add to Team Button
        - Link to Bulbapedia Page 
*/

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: "0.5rem",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  leftContainer: {
    width: "23%",
    height: "100%",
  },
}));

//props: props.name, props.objectUrl
const PokeCard = (props) => {
  const classes = useStyles();
  const [spriteIcon, setSprite] = useState({});
  const [name, setName] = useState("");
  const [id, setID] = useState(0);
  const [types, setTypes] = useState([]);

  //Fetch Pokemon Object on Initial Render of Component
  useEffect(() => {
    axios
      .get(props.objectUrl)
      .then((res) => {
        setName(res.data.name);
        setSprite(res.data.sprites.front_default);
        setID(res.data.id);
        setTypes(res.data.types);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={classes.card}>
      <div className={classes.leftContainer}>
        <img src={spriteIcon} alt="spriteIcon"></img>
      </div>
      <div className={classes.rightContainer}>
        <h3>{name}</h3>
        <p> {`ID: ${id}`}</p>
        <p> Types: ?</p>
      </div>
    </div>
  );
};

export default PokeCard;
