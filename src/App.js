import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Header from "./components/Header";
import Map from "./components/Map";

import "./App.css";

import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
