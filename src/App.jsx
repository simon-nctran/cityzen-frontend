import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { useUser } from "./api/apiUser";
import UserContext from "./UserContext";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("auth-token"));

  const userStatus = useUser(token, setToken);
  const { loading } = userStatus;

  return (
    <Router>
      <div className="App">
        {loading ? (
          <></>
        ) : (
          <>
            <Switch>
              <UserContext.Provider value={{ userStatus, token, setToken }}>
                <Nav />
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
              </UserContext.Provider>
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}
