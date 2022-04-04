import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import pokeAPIServices from "../services/pokeAPIServices";
import TypeDisplay from "./TypeDisplay";

/*
 * Component that houses the logic to calculate damage relations for each Pokemon
 * then passes the data to component TypeDisplay, which displays it.
 */

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  // MEDIA QUERY
  "@media (min-width: 40em)": {
    //beyond 640px activates (Desktop mode)
    container: {
      flexDirection: "row",
      "& > * + *": { marginLeft: "1em" }, // Adjacent Sibling, separates two selectors and matches the second element only
      "& p": { minWidth: "2.2em" },
    },
  },
}));

const EffectivenessDisplay = (props) => {
  const classes = useStyles();
  const [quad_damage_from, setQuad] = useState([]);
  const [double_damage_from, setDouble] = useState([]);
  const [half_damage_from, setHalf] = useState([]);
  const [fourth_damage_from, setFourth] = useState([]);
  const [no_damage_from, setNoDmg] = useState([]);

  /*
   * When props.types i.e. ["fire", "flying"] gets rendered in,
   * call the proper function to calculate damage relation 4x, 2x, 1/2x, 1/4x, 0x
   * and set hooks accordingly
   */
  useEffect(() => {
    //Dual Typing
    if (props.types.length === 2 && typeof props.types === "object") {
      let one_damage_relations = null;

      //First Type
      pokeAPIServices
        .getTypeDamageRelations(props.types[0].toLowerCase())
        .then((res) => {
          one_damage_relations = res;
          //Second type
          pokeAPIServices
            .getTypeDamageRelations(props.types[1].toLowerCase())
            .then((res) => handleSetRelations(one_damage_relations, res));
        });
    }
    //Mono Typed (props.types will come in as string i.e. "fighting")
    else if (typeof props.types === "string") {
      pokeAPIServices.getTypeDamageRelations(props.types).then((res) => {
        handleSetRelations(res);
      });
    }
  }, [props.types]);

  /*
   * With dual-typed mons, edge cases in which duplicate types appear across seperate relationships.
   * Check for duplicates when relations are set, and recalculate dupes to their proper spot.
   * (only 2x,1/2x relationships are considered as 1/4x and 4x edge cases are handled in set_and_merge_relations)
   */
  useEffect(() => {
    if (double_damage_from.length !== 0 && half_damage_from.length !== 0) {
      const combined = [...double_damage_from, ...half_damage_from];
      //Find the duplicates
      let dupes = combined.filter(
        (ele, index) => combined.indexOf(ele) !== index
      );
      console.log("Combined", combined);
      console.log("Dupes: ", dupes);

      if (dupes.length !== 0) {
        //Purge the duplicates from both relations
        setDouble(double_damage_from.filter((ele) => !dupes.includes(ele)));
        setHalf(half_damage_from.filter((ele) => !dupes.includes(ele)));
      }
    }
  }, [double_damage_from, half_damage_from]);

  /*
   * Read/extract relations from @param and call functions to set relationship hooks accordingly
   *
   * @param: object of arrays of objects {[{}],[{}],[{}],[{}]}
   */
  const handleSetRelations = (object1, object2 = []) => {
    if (props.types.length === 2 && typeof props.types === "object") {
      merge_and_set_relations(object1, object2);
    } else setRelation(object1);
  };

  const merge_and_set_relations = (object1, object2) => {
    //relationship in both obj1 and obj2 are always in same order so no double nested for
    for (let relationship in object1) {
      let relationArray = [];

      //Just Merge Now, deal with dupes later
      for (let ele of object1[relationship]) {
        //for ele of object1[double_damage_from]
        relationArray.push(ele.name);
      }
      for (let ele of object2[relationship]) {
        relationArray.push(ele.name);
      }

      // Find the duplicates now
      let dupesArray = relationArray.filter(
        (ele, index) => relationArray.indexOf(ele) !== index
      );

      // Filter out the dupes completely, they will be set to the 4x, 1/4x or etc.
      relationArray = relationArray.filter(
        (ele, index) => !dupesArray.includes(ele)
      );

      switch (relationship) {
        case "double_damage_from":
          setQuad(dupesArray);
          setDouble(relationArray);
          break;
        case "half_damage_from":
          setFourth(dupesArray);
          setHalf(relationArray);
          break;
        case "no_damage_from":
          setNoDmg(relationArray);
          break;
        default:
          break;
      }
    }
  };

  // Given an object of weakness relations, set the respsective elements to their appropriate hooks
  const setRelation = (object) => {
    for (let relationship in object) {
      let relationArray = [];

      for (let ele of object[relationship]) {
        relationArray.push(ele.name);
      }

      switch (relationship) {
        case "double_damage_from":
          setDouble(relationArray);
          break;
        case "half_damage_from":
          setHalf(relationArray);
          break;
        case "no_damage_from":
          setNoDmg(relationArray);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={props.style}>
      {/*4x Effectiveness*/}
      {quad_damage_from.length !== 0 ? (
        <div className={classes.container}>
          <p>x4</p> <TypeDisplay relationArray={quad_damage_from} />
        </div>
      ) : null}

      {double_damage_from.length !== 0 ? (
        <div className={classes.container}>
          <p>x2</p> <TypeDisplay relationArray={double_damage_from} />
        </div>
      ) : null}

      {half_damage_from.length !== 0 ? (
        <div className={classes.container}>
          <p>x1/2 </p>
          <TypeDisplay relationArray={half_damage_from} />
        </div>
      ) : null}

      {fourth_damage_from.length !== 0 ? (
        <div className={classes.container}>
          <p>x1/4</p> <TypeDisplay relationArray={fourth_damage_from} />
        </div>
      ) : null}

      {no_damage_from.length !== 0 ? (
        <div className={classes.container}>
          <p>x0</p> <TypeDisplay relationArray={no_damage_from} />
        </div>
      ) : null}
    </div>
  );
};

export default EffectivenessDisplay;
