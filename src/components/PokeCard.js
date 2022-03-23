import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Color from "../constants/Color";
import axios from "axios";

import EffectivenessDisplay from "./EffectivenessDisplay";
import Card from "./Card";

/*
    Each card should 
        - Display Image Sprite, Name, #ID, Typing
        - Show "Defenses/Offenses" against their typing.
        - Add to Team Button
        - Link to Bulbapedia Page 
*/

const useStyles = makeStyles((theme) => ({
  container: {
    fontSize: "1em",
    marginTop: "1em",
  },

  split: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  effectivenessContainer: {
    flexGrow: 1,
    "&": {
      color: Color.lightgray,
    },
  },

  // MEDIA QUERY
  "@media (min-width: 40em)": {
    //beyond 640px activates
    split: {
      flexDirection: "row",
      "& > * + *": { marginLeft: "2em" }, // Adjacent Sibling, separates two selectors and matches the second element only
    },
  },
}));

//props: props.objectUrl, props.handleSetLoading
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
        //console.log("\n\nEVALUATING: ", res.data.name, "\n\n");
        setName(res.data.name);
        setSprite(res.data.sprites.front_default);
        setID(formatID(res.data.id));
        setTypes(res.data.types[0].type.name);

        //if it's dual typing
        if (res.data.types[1] != null) {
          setTypes([res.data.types[0].type.name, res.data.types[1].type.name]);
        }
      })
      .catch((error) => error);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.split}>
        <Card
          title={toUpperFirstCase(name)}
          id={id}
          types={toUpperFirstCase(types)}
          icon={spriteIcon}
        ></Card>

        <EffectivenessDisplay
          types={types}
          style={classes.effectivenessContainer}
        />
      </div>
    </div>
  );
};

export default PokeCard;
