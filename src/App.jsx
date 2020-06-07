import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import SimpleBar from "simplebar-react";
// import "simplebar/dist/simplebar.min.css";
// Why use SimpleBar: https://stackoverflow.com/questions/57862671/how-to-make-scroll-bar-overlay-content

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
    <Router>
      <div className="App">
        {/* <SimpleBar style={{ height: "100vh" }}> */}
        {/* https://stackoverflow.com/questions/12172177/set-div-height-equal-to-screen-size/41537811#41537811 */}
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
        {/* </SimpleBar> */}
      </div>
    </Router>
  );
}
