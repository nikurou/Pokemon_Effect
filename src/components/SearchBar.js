import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  searchOnFocus: {
    width: "100%",
    transition: "width 0.2s",
  },
  searchOnBlur: {
    width: "99.5%",
    marginLeft: "auto",
    marginRight: "auto",
    transition: "width .2s",
  },
  searchBar: {
    padding: "4px 4px",
    display: "flex",
    alignItems: "center", //center vertically
    backgroundColor: "dimgray",
  },
  inputView: {
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    color: "white",
    backgroundColor: "dimgray",
    borderWidth: "0",
    border: "None",
    width: "85%",
    transition: "width .8s",
    "&:focus": { width: "85%", outline: "None" },
    "&::placeholder": { color: "white" },
  },
  // MEDIA QUERY
  "@media (min-width: 40em)": {
    //beyond 640px activates
  },
}));

const SearchBar = ({ searchInput, handleSearchChange, handleSearch }) => {
  //whether or not textbar is focused on
  const [isInputFocused, setIsInputFocused] = useState(false);
  const classes = useStyles();

  // If Enter is hit, commence the search
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Enter pressed");
      handleSearch();
    }
  };

  return (
    <div className={classes.searchContainer}>
      <div
        className={
          isInputFocused ? classes.searchOnFocus : classes.searchOnBlur
        }
        tabIndex="1"
      >
        <Paper className={classes.searchBar}>
          <div className={classes.icon}>
            <SearchIcon style={{ color: "white" }} />
          </div>
          <div className={classes.inputView}>
            <input
              placeholder="Search by name, id..."
              className={classes.input}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              value={searchInput}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default SearchBar;
