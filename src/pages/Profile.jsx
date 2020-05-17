import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import Button from "../components/Button";


export default function Profile() {
  const [form, setForm] = useState(<React.Fragment />);
  const [toggledLogin, setToggledLogin] = useState(false)
  const [toggledRegister, setToggledRegister] = useState(false)

  function displayLogin() {
    setToggledLogin(true)
    setToggledRegister(false)
    setForm(<LoginForm />)
  }
  function displayRegister() {
    setToggledRegister(true)
    setToggledLogin(false)
    setForm(<RegistrationForm />)
  }

  return (
    <React.Fragment>
      {<React.Fragment>{form}</React.Fragment>}
      {!toggledLogin && <Button onClick={displayLogin}>Login</Button>}
      {!toggledRegister && <Button onClick={displayRegister}>Register</Button>}
    </React.Fragment>
  )
}