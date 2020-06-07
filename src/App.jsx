import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";
/* https://react-bootstrap.netlify.app/getting-started/introduction */

import "./App.css";

import { useUser } from "./api/apiUser";
import UserContext from "./UserContext";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("auth-token"));
  // useContext Hook Tutorial: https://www.youtube.com/watch?v=lhMKvyLRWo0

  const userStatus = useUser(token, setToken);
  const { loading } = userStatus;

  return (
    // Using Fragments:
    // https://reactjs.org/docs/fragments.html#short-syntax
    // https://stackoverflow.com/questions/47761894/why-are-fragments-in-react-16-better-than-container-divs
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
