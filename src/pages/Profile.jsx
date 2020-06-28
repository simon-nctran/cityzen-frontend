import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import ProfileContents from "../components/ProfileContents";

import UserContext from "../UserContext";

// Profile Component (child to App Component)
export default function Profile() {
  const { userStatus, token, setToken } = useContext(UserContext);

  const [form, setForm] = useState(<h2>How would you like to proceed?</h2>);
  const [toggledLogin, setToggledLogin] = useState(false);
  const [toggledRegister, setToggledRegister] = useState(false);
  const [toggledProfile, setToggledProfile] = useState(Boolean(userStatus.userData));
  // Boolean(): https://stackoverflow.com/questions/31155477/convert-truthy-or-falsy-to-an-explicit-boolean

  function displayLogin() {
    setToggledLogin(true);
    setToggledRegister(false);
    setForm(<LoginForm />);
  }

  function displayRegister() {
    setToggledRegister(true);
    setToggledLogin(false);
    setForm(<RegistrationForm />);
  }

  function logout() {
    console.log("logging out");
    setForm(<h2>You have logged out</h2>);
    setToggledLogin(false);
    setToggledRegister(false);
    setToggledProfile(false);
    setToken(null);
    localStorage.removeItem("auth-token");
  }

  useEffect(() => {
    console.log("entered use effect in profile.jsx");
    setToggledLogin(false);
    setToggledRegister(false);

    if (token !== null) {
      setToggledProfile(true);
    } else {
      setToggledProfile(false);
    }
  }, [token]);

  return (
    <>
      {userStatus.loading ? (
        <p>Checking if logged in..{console.log("checking log")}</p>
      ) : (
        <>
          {toggledProfile ? (
            <Row>
              <Col className="profile">
                <ProfileContents logout={logout} />
              </Col>
            </Row>
          ) : (
            <div className="centre">
              {form}

              {!toggledLogin && (
                <Button variant="black" onClick={displayLogin}>
                  I want to Log In
                </Button>
              )}

              {!toggledRegister && (
                <Button variant="black" onClick={displayRegister}>
                  I want to Register
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
