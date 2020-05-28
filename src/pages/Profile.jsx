import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

import UserContext from "../UserContext";
import ProfileContents from "../components/ProfileContents";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  const [form, setForm] = useState(<h1>How would you like to proceed?</h1>);
  const [toggledLogin, setToggledLogin] = useState(false);
  const [toggledRegister, setToggledRegister] = useState(false);
  const [toggledProfile, setToggledProfile] = useState(false);

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
    setForm(<h1>You have logged out</h1>);
    setToggledLogin(false);
    setToggledRegister(false);
    setToggledProfile(false);
    setUser(null);
    localStorage.removeItem("username");
  }

  useEffect(() => {
    console.log(user);
    setToggledLogin(false);
    setToggledRegister(false);

    if (user !== null) {
      setToggledProfile(true);
    } else {
      setToggledProfile(false);
    }
  }, [user]);

  return (
    <>
      {toggledProfile ? (
        <ProfileContents username={user} logout={logout} />
      ) : (
        <>
          {form}

          {!toggledLogin && (
            <Button variant="dark" onClick={displayLogin}>
              I want to Log In
            </Button>
          )}

          {!toggledRegister && (
            <Button variant="dark" onClick={displayRegister}>
              I want to Register
            </Button>
          )}
        </>
      )}
    </>
  );
}
