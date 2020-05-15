import React from "react";

import { getPlaces } from "../api";

export default function Places() {
  const { places } = getPlaces();
  console.log(places);

  return null;
}
