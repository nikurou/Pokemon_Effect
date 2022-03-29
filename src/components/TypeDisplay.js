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
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginRight: "1em",
    flexDirection: "row",
    maxWidth: "100%",

    "& $p": {
      margin: "0",
    },
  },
  typeBox: {
    borderRadius: "20%",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",

    color: Color.primaryColor,
    marginRight: "0.5em",
    marginTop: "0.3em",
    marginBottom: "auto",
  },
  //Develop rules for mobile view on chips
}));

const TypeDisplay = (props) => {
  const classes = useStyles();
  const [rel, setRel] = useState([]);

  useEffect(() => {
    setRel(props.relationArray);
  }, [props.relationArray]);

  return (
    <div className={classes.container}>
      {rel.length !== 0
        ? rel.map((ele) => {
            return (
              <div
                className={classes.typeBox}
                style={{ backgroundColor: Color[`${ele}Type`] }}
              >
                <p>{ele.toUpperCase()}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default TypeDisplay;
