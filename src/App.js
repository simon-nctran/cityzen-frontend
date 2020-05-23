import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./App.css";

import UserContext from "./UserContext";

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
// Why use SimpleBar: https://stackoverflow.com/questions/57862671/how-to-make-scroll-bar-overlay-content

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("username"))
  // useContext Hook Tutorial: https://www.youtube.com/watch?v=lhMKvyLRWo0

  return (
    <Router>
      <div className="App">
        <SimpleBar style={{ height: '100vh' }}>
          {/*https://stackoverflow.com/questions/12172177/set-div-height-equal-to-screen-size/41537811#41537811 */}
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
        </SimpleBar>
      </div>
    </Router>
  );
}
