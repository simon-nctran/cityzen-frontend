import React, { useState, useContext } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import Button from "../components/Button";

import UserContext from "../UserContext";

export default function Profile() {
  const [user, setUser] = useContext(UserContext);

  const [form, setForm] = useState(<h1>How would you like to proceed?</h1>);
  const [profile, setProfile] = useState(<React.Fragment />);
  const [toggledLogin, setToggledLogin] = useState(false);
  const [toggledRegister, setToggledRegister] = useState(false);
  const [toggledProfile, setToggledProfile] = useState(false);

  function displayLogin() {
    setToggledLogin(true);
    setToggledRegister(false);
    setForm(<LoginForm loginSuccess={displayProfile} />);
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
