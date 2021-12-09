import "./styles/App.css";
import Header from "./components/Header";
import Colors from "./constants/Color";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Info from "./screens/Info";
import TypeEffect from "./screens/TypeEffect";
import Pokedex from "./screens/Pokedex";
import Team from "./screens/Team";

const useStyles = makeStyles((theme) => ({
  App: {
    backgroundColor: Colors.backgroundColorDark, //Make toggleable between L/D later?
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Router>
        <Header />

        <Switch>
          <Route path="/team">
            <Team />
          </Route>
          <Route path="/typeEffect">
            <TypeEffect />
          </Route>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/pokedex">
            <Pokedex />
          </Route>
          <Route path="/">
            <TypeEffect />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
