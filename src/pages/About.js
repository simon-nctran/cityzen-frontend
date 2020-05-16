import React from "react";

import { getAbout, useAbout } from "../api";

export default function About() {
  console.log(getAbout());
  return null;

  const { loading, about, error } = useAbout();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  console.log(about);

  return null;
}
