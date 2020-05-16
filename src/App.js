import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Header from "./components/Header";
import Map from "./components/Map";

import Home from "./pages/Home";

import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/">
            <Header />
            <Map />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
