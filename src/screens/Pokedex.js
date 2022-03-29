import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import PokeCard from "../components/PokeCard";
import SearchBar from "../components/SearchBar";
import Color from "../constants/Color";

/*
    Use PokeAPI to allow the user to search for Pokemons,
        - Display Image Sprite, Name, #ID, Typing
        - Show "Defenses" against their typing.
        - Add to Team Button
        - Link to Bulbapedia Page 

*/

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    //only used for loading screen, and error messages
    marginRight: "1em",
    marginLeft: "1em",
    "& p": {
      color: Color.lightgray,
    },
  },
  container: {
    margin: "auto",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  navigationContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: "1em",
    marginBottom: "1em",
  },
  navigationButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    "& Button": { color: Color.lightgray, borderColor: Color.lightgray },
  },
  pokeListContainer: {
    marginTop: "1.5%",
    marginBotton: "1.5%",
    width: "100%",
  },
}));

const Pokedex = () => {
  const classes = useStyles();
  const [currentList, setCurrentList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [loading, setLoading] = useState(true); //by default, we are buffering
  const [error, setError] = useState(false); // determines if error screen pops up
  const [searchInput, setInput] = useState("");

  // Fetch first 20 Pokemon, set next and previous page
  useEffect(() => {
    setLoading(true); //Loading screen
    let cancel;

    async function fetchData() {
      await axios
        .get(currentPage, {
          canceltoken: new axios.CancelToken((c) => (cancel = c)),
        })
        .then((res) => {
          setLoading(false);
          setError(false);
          setNextPage(res.data.next);
          setPrevPage(res.data.previous);
          setCurrentList(res.data.results.map((p) => p));
          setOriginalList(res.data.results.map((p) => p));
        });
    }
    fetchData();
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

  // On text change, update search bar text
  const handleSearchChange = (event) => {
    setInput(event.target.value);

    if (event.target.value === "" && originalList !== []) {
      setCurrentList(originalList);
    }
    // If text empty, there will be no error
    if (event.target.value === "") {
      setError(false);
    }
  };

  // On Search, display the searched Pokemon
  // Axios not really needed except to validate search result
  // TODO: Partial Word
  const handleSearch = () => {
    setError(false); //anytime search is ran, error is false until reverified
    setLoading(true);
    var name = searchInput.trim().toLowerCase();
    console.log("handlesearch called with ", name);
    var url = `https://pokeapi.co/api/v2/pokemon/${name}/`;

    if (name === "") {
      return;
    }

    axios
      .get(url)
      .then((res) => {
        setCurrentList([{ name, url }]);
        setLoading(false);
      })
      // If such a query does not exist or some error
      .catch((Error) => {
        setLoading(false);
        setError(true);
      });
  };

  const displayPokeCards = () => {
    return (
      <div>
        {currentList.map((p) => (
          <div key={p.name} className={classes.pokeListContainer}>
            <PokeCard objectUrl={p.url}></PokeCard>
          </div>
        ))}
        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
          <NavigationControls />
        </div>
      </div>
    );
  };

  const displayError = () => {
    return (
      <div className={classes.pokedexContainer}>
        <p>That Pokemon does not exist! Check your spelling or try again. </p>
      </div>
    );
  };

  const displayLoading = () => {
    return (
      <div className={classes.pokedexContainer}>
        <p>Fetching Results!</p>
      </div>
    );
  };

  // Nav Controls
  function NavigationControls() {
    return (
      <div className={classes.navigationButtonContainer}>
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
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.navigationContainer}>
        <SearchBar
          searchInput={searchInput}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
        ></SearchBar>
        <div style={{ marginTop: "1%" }}>
          <NavigationControls />
        </div>
      </div>

      {/* Render either loading screen, error, or PokeCards */}
      {
        error === true // is error true?
          ? displayError() // if so displayError
          : loading === true // otherwiser is loading true?
          ? displayLoading() // if so display loading
          : displayPokeCards() // else just show cards
      }
    </div>
  );
};

export default Pokedex;
