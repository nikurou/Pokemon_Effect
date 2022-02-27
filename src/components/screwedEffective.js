import React, { useCallback, useEffect, useState } from "react";
import pokeAPIServices from "../services/pokeAPIServices";

/*
 * DEPRECATED version of effectiveDisplay. It's not this doesn't work, BUT
 * there is simply a better solution of merging the two objects and working out the
 * logic before setting relations
 *
 *
 * Component that houses the logic to calculate damage relations for each Pokemon
 * and displays it.
 */

const EffectivenessDisplay = (props) => {
  const [quad_damage_from, setQuad] = useState([]);
  const [double_damage_from, setDouble] = useState([]);
  const [half_damage_from, setHalf] = useState([]);
  const [fourth_damage_from, setFourth] = useState([]);
  const [no_damage_from, setNoDmg] = useState([]);
  const [evalOneDone, setDone] = useState(false);
  /*
   * When props.types i.e. ["fire", "flying"] gets rendered in,
   * call the proper function to calculate damage relation 4x, 2x, 1/2x, 1/4x, 0x
   * and set hooks accordingly
   */
  useEffect(() => {
    //Dual Typing
    if (props.types.length === 2 && typeof props.types === "object") {
      console.log("dual type");
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
    else if (typeof props.types === String) {
      pokeAPIServices.getTypeDamageRelations(props.types).then((res) => {
        console.log(res);
        handleSetRelations(res);
      });
    }
  }, [props.types]);

  //If there is a second type, evaluate it
  useEffect(() => {
    console.log("UPDATED", double_damage_from);
    if (
      props.types.length === 2 &&
      typeof props.types === "object" &&
      evalOneDone === false
    ) {
      pokeAPIServices
        .getTypeDamageRelations(props.types[1].toLowerCase())
        .then((res) => {
          handleSetRelations(res);
        });
    }
  }, [double_damage_from]);

  /*
   * Read/extract relations from @param and call functions to set relationship hooks accordingly
   *
   * @param: object of arrays of objects {[{}],[{}],[{}],[{}]}
   */
  const handleSetRelations = (object1) => {
    setRelation(object1);
  };

  const setRelation = (object) => {
    for (let relationship in object) {
      let relationshipArray = object[relationship]; //object[double_damage_from] = [{},{}]
      let effectedBy = [];
      for (let effect of relationshipArray) {
        effectedBy.push(effect.name);
      }
      console.log(relationship, effectedBy);

      switch (relationship) {
        case "double_damage_from":
          handleSetDouble(effectedBy);
          break;
        case "half_damage_from":
          setHalf(effectedBy);
          break;
        case "no_damage_from":
          setNoDmg(effectedBy);
          break;
        default:
          break;
      }
    }
    setDone(true);
  };

  const handleSetDouble = (effectedBy) => {
    console.log(double_damage_from.length);
    // if empty, default state, just set
    if (double_damage_from.length === 0) {
      console.log("Double ", double_damage_from, "effectedBy", effectedBy);
      setDouble(effectedBy);
    }
    //else dual typed
    else if (double_damage_from.length > 0) {
      let tempDouble = [...double_damage_from];
      let tempQuad = [];
      console.log("Temp Double ", tempDouble, "effectedBy", effectedBy);
      for (let ele of effectedBy) {
        // If current element is already in the double damage array
        if (double_damage_from.includes(ele)) {
          // Then add to tempQuad and remove from tempDouble
          tempQuad.push(ele);
          tempDouble = tempDouble.filter((element) => element !== ele);
        } else {
          //ele is not in double_damage_from, add it in.
          tempDouble.push(ele);
        }
      }
      // Setter
      console.log("END TEMPDOUBLE", tempDouble, "END QUAD", tempQuad);
      setDouble(tempDouble);
      setQuad(tempQuad);
    }
  };

  const handleSetHalf = () => {};

  return (
    <div className={props.style}>
      <div>x4 {quad_damage_from} </div>
      <div>x2 {double_damage_from}</div>
      <div>x1/2 {half_damage_from}</div>
      <div>x1/4 {fourth_damage_from}</div>
      <div>Immune {no_damage_from}</div>
    </div>
  );
};

export default EffectivenessDisplay;
