import React, { useEffect, useState } from "react";
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "50em",
    margin: "auto",
    "& p": {
      color: Color.lightgray,
    },
  },
  navigationButtonContainer: {
    display: "flex",
    justifyContent: "space-between",

    "& Button": {},
  },
  pokeListContainer: {
    marginTop: "1.5%",
    marginBotton: "1.5%",
    width: "100%",
  },
  searchBar: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "1.5%",
    marginBottom: "1.5%",
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
    var name = searchInput.trim().toLowerCase();
    var url = `https://pokeapi.co/api/v2/pokemon/${name}/`;

    if (name === "") {
      return;
    }

    axios
      .get(url)
      .then((res) => {
        setCurrentList([{ name, url }]);
      })
      // If such a query does not exist or some error
      .catch((Error) => {
        setError(true);
      });
  };

  // Decides to render ERROR, LOADING, or RESULTS based on conditions
  function RenderDecider({ error, loading }) {
    if (error) {
      return (
        <div className={classes.pokedexContainer}>
          <p>That Pokemon does not exist! Check your spelling or try again. </p>
        </div>
      );
    } else if (loading) {
      return <div className={classes.pokedexContainer}>Fetching Results!</div>;
    } else {
      return (
        <div>
          <NavigationControls />
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
    }
  }

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
    <div className={classes.pokedexContainer}>
      <div className={classes.searchBar}>
        <SearchBar
          searchInput={searchInput}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
        ></SearchBar>
      </div>

      {/* Render either loading screen, error, or PokeCards */}
      <RenderDecider error={error} loading={loading} />
    </div>
  );
};

export default Pokedex;
