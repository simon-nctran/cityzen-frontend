import React, { useState, useEffect, useContext } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import Button from "../components/Button";

import UserContext from "../UserContext";
import { getUser } from "../api";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  const [form, setForm] = useState(<h1>How would you like to proceed?</h1>);
  const [profile, setProfile] = useState(<React.Fragment />);
  const [toggledLogin, setToggledLogin] = useState(false);
  const [toggledRegister, setToggledRegister] = useState(false);
  const [toggledProfile, setToggledProfile] = useState(false);

  function displayLogin() {
    setToggledLogin(true);
    setToggledRegister(false);
    setForm(<LoginForm/>);
  }

  function displayRegister() {
    setToggledRegister(true);
    setToggledLogin(false);
    setForm(<RegistrationForm registrationSuccess={displayProfile} />);
  }

  function displayProfile(profile) {
    setToggledProfile(true)
    setToggledLogin(false)
    setToggledRegister(false)

    setProfile(profile);
  }

  function displayUser(username) {
    getUser(username).then((res) => {
      console.log(res.data);
      setProfile(
        <React.Fragment>
          <h1>Hi there, {username}</h1>
          <br />
          <h3>Your Profile:</h3>

          <div className="profileDetails">
            <p>Username: {res.data.username}</p>
            <p>Password: {res.data.password}</p>
            <p>Email Address: {res.data.emailAddress}</p>
          </div>

          <br />
          <h2>Thank you for trying out Cityzen!</h2>
          <Button onClick={logout}>Logout</Button>
        </React.Fragment>
      );
      // NOTE: Placed logout button in here so that it displays at the same time as profile text
      // If it were outside it would display earlier
    });
  }

  function logout() {
    setForm(<h1>You have logged out</h1>);
    setProfile(<React.Fragment />)
    setToggledLogin(false);
    setToggledRegister(false);
    setToggledProfile(false)
    setUser(null);
  }

  useEffect(() => {
    if (user !== null) {
      console.log(user)
      setToggledLogin(false)
      setToggledRegister(false)
      setToggledProfile(true)
      displayUser(user)
    } else {
      // code below kind of duplicates with logout() function
      console.log(user)
      setToggledLogin(false);
      setToggledRegister(false);
      setToggledProfile(false)
      setProfile(<React.Fragment />)
    }
  }, [user])





  return (
    <React.Fragment>
      {toggledProfile && <React.Fragment>{profile}</React.Fragment>}

      {!toggledProfile && (
        <React.Fragment>
          {form}
          {!toggledLogin && <Button onClick={displayLogin}>I want to Log In</Button>}
          {!toggledRegister && (
            <Button onClick={displayRegister}>I want to Register</Button>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
