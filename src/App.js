import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Header from "./components/Header";

import Home from "./pages/Home";
import About from "./pages/About";
import Places from "./pages/Places";

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
            <Home />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/places">
            <Places />
          </Route>

          <Route path="/login">
            <LoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
