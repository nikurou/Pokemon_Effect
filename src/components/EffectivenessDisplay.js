import React, { useState } from "react";
import pokeAPIServices from "../services/pokeAPIServices";

const EffectivenessDisplay = (props) => {
  const [double_damage_from, setDouble] = useState("");

  const getTypeDamageRelations = (type) => {
    pokeAPIServices
      .getTypeDamageRelations(type)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(Error));
  };

  return (
    <div className={props.style}>
      <div>x4 {props.types}</div>
      <div>x2</div>
      <div>x1/2</div>
      <div>x1/4</div>
      <div>Immune</div>
    </div>
  );
};

export default EffectivenessDisplay;
