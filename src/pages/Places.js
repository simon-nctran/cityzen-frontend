import React from "react";

import { usePlaces } from "../api";

export default function Places() {
  const { loading, places, error } = usePlaces();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  console.log(places);

  return null;
}
