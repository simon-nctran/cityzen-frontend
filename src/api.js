import { useState, useEffect } from "react";

const BASE_URL = "https://cityzen-app.herokuapp.com";

function getAbout() {
  const endpoint = BASE_URL + "/about";

  // return fetch call that gets about page
  return fetch(endpoint).then((res) => {
    console.log(res);

    return res.sendFile();
  });
}

export function useAbout() {
  const [loading, setLoading] = useState(true);
  const [about, setAuthors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAbout()
      .then((about) => {
        setAuthors(about);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    about,
    error,
  };
}

export function newJourney(journey) {
  const { origin, destination, option } = journey;
  if (!origin || !destination || !option) {
    alert("must include all fields");
    return;
  }

  const endpoint = BASE_URL + `/author-management/`;

  return fetch(endpoint).then((res) => {
    console.log(res);
    return null;
  });
}

function getPlaces() {
  const endpoint = BASE_URL + "/places";

  // return fetch call that gets about page
  return fetch(endpoint).then((res) => {
    console.log(res);
    return res.json();
  });
}

export function usePlaces() {
  const [loading, setLoading] = useState(true);
  const [places, setAuthors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPlaces()
      .then((places) => {
        setAuthors(places);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    places,
    error,
  };
}
