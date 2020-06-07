import React from "react";
import { Container, Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className="home" align="middle">
      <Container>
        <h1>WELCOME TO ON THE WAY!</h1>
        <br />
        <h4>
          This app will help you find services and points of interest from your
          origin on the way to your destination!
        </h4>
        <br />
        <Button href="/journey"> Get Started!</Button>
        <br />
        <br />
        <p>This app was created by the members of Cityzen.</p>
        <p>The University of Melbourne (2020)</p>
      </Container>
    </div>
  );
}
