import React from "react";

import { useAbout } from "../api";

export default function About() {
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
