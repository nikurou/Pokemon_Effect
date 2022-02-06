import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Color from "../constants/Color";
import axios from "axios";

/*
    Each card should 
        - Display Image Sprite, Name, #ID, Typing
        - Show "Defenses/Offenses" against their typing.
        - Add to Team Button
        - Link to Bulbapedia Page 
*/

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    backgroundColor: Color.accentColor,
    color: Color.lightgray,
    flexDirection: "column",
    borderRadius: "0.5rem",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "20em",
    height: "20em",
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

//props: props.name, props.objectUrl
const PokeCard = (props) => {
  const classes = useStyles();
  const [spriteIcon, setSprite] = useState({});
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [types, setTypes] = useState([]);

  // Capitalize first letter of input where input can be a string or an array of strings
  const toUpperFirstCase = (input) => {
    var temp = input;

    //Depending on if input is []
    if (typeof input === "object") {
      for (var i = 0; i < temp.length; i++) {
        temp[i] = temp[i].charAt(0).toUpperCase() + temp[i].slice(1);
      }
      // if input is string
    } else if (typeof input === "string") {
      temp = input.charAt(0).toUpperCase() + input.slice(1);
    }
    return temp;
  };

  // Convert any number input into string with "###" format, where missing digits
  // are filled with 0.
  const formatID = (id_number) => {
    console.log("format ID");
    if (id_number / 100 >= 1) {
      return "" + id_number;
    } else if (id_number / 10 >= 1) {
      return "0" + id_number;
    } else if (id_number / 1 >= 1) return "00" + id_number;
  };

  //Fetch Pokemon Object on Initial Render of Component
  useEffect(() => {
    axios
      .get(props.objectUrl)
      .then((res) => {
        setName(res.data.name);
        setSprite(res.data.sprites.front_default);
        setID(formatID(res.data.id));
        setTypes(res.data.types[0].type.name);
        //if it's dual typing
        if (res.data.types[1] != null) {
          setTypes([res.data.types[0].type.name, res.data.types[1].type.name]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={classes.card}>
      <div className={classes.cardTop}>
        <h3>{toUpperFirstCase(name)}</h3>
        <p> {` #${id}`}</p>
      </div>
      <div className={classes.cardImage}>
        <img src={spriteIcon} alt="spriteIcon"></img>
      </div>
      <div className={classes.cardBottom}>
        <p> {`${toUpperFirstCase(types)}`}</p>
      </div>
    </div>
  );
};

export default PokeCard;
