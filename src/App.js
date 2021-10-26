import "./styles/App.css";
import Header from "./components/Header";
import Colors from "./constants/Color";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Info from "./components/Info";
import TypeEffect from "./components/TypeEffect";

const useStyles = makeStyles((theme) => ({
  App: {
    backgroundColor: Colors.backgroundColorDark,
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Router>
        <Header />

        <Switch>
          <Route path="/typeEffect">
            <TypeEffect />
          </Route>
          <Route path="/info">
            <Info />
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
