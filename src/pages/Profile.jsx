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
// Note regarding onClick:
// onClick takes in a reference to a function or value, that means if you give it func(),
// then it will receive the output of func(). If func() has side effects, then these side effects
// will be activated on each render as onClick tries to evaluate the value of func().
// To prevent this, either:
// 1. provide onClick with `func` on its own, which is a reference to the function func
// 2. use arrow functions to pass func itself as the return value, i.e. onCLick={() => func()}
// use 2. when you need to pass parameters in the function func
// https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js/34226188#34226188
