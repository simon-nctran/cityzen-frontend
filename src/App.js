import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./App.css";

import UserContext from "./UserContext";

export default function App(props) {
  const [user, setUser] = useState(props.username)
  // useContext Hook Tutorial: https://www.youtube.com/watch?v=lhMKvyLRWo0

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <UserContext.Provider value={{user, setUser}}>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}
