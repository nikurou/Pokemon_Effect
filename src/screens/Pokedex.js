import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import PokeCard from "../components/PokeCard";

/*
    Use PokeAPI to allow the user to search for Pokemons,
        - Display Image Sprite, Name, #ID, Typing
        - Show "Defenses" against their typing.
        - Add to Team Button
        - Link to Bulbapedia Page 

*/

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  navigationButtonContainer: {},
  pokeListContainer: {
    marginTop: "5%",
    marginBotton: "5%",
    width: "40%",
  },
}));

const Pokedex = () => {
  const classes = useStyles();
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [loading, setLoading] = useState(true); //by default, we are buffering

  // Fetch first 20 Pokemon, set next and previous page
  useEffect(() => {
    setLoading(true); //Loading screen
    let cancel;
    axios
      .get(currentPage, {
        canceltoken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setPokemonList(res.data.results.map((p) => p));
      });
    // Cancel previous request if new one is put in
    return () => cancel();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(nextPage);
  };
  const handlePrevPage = () => {
    if (prevPage != null) {
      setCurrentPage(prevPage);
    }
  };

  // If Loading is true, display this buffering
  // TODO : Would be cool to do the spinning pokeball animation
  if (loading)
    return <div className={classes.pokedexContainer}>Fetching Results!</div>;

  return (
    <div className={classes.pokedexContainer}>
      {pokemonList.map((p) => (
        <div className={classes.pokeListContainer} key={p}>
          <PokeCard objectUrl={p.url}></PokeCard>
        </div>
      ))}

      <div>
        {prevPage == null ? (
          <Button variant="contained" disabled>
            Previous
          </Button>
        ) : (
          <Button variant="outlined" onClick={handlePrevPage}>
            Previous
          </Button>
        )}

        <Button variant="outlined" onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pokedex;
