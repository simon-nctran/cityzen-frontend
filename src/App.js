import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Header from "./components/Header";
import Map from "./components/Map";

import "./App.css";

import LoginForm from "./components/LoginForm";

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

          <Route path="/login">
            <LoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
