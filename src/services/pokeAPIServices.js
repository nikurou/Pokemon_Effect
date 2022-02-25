import axios from "axios";
const baseUrl = "https://pokeapi.co/api/v2/";

const getTypeDamageRelations = (type) => {
  const request = axios.get(`${baseUrl}/type/${type}`);
  return request.then((res) => res.data.damage_relations);
};

export default { getTypeDamageRelations };
