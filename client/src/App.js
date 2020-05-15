import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";

import Home from "./pages/Home";
import About from "./pages/About";
import Places from "./pages/Places";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/places">
            <Places />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
