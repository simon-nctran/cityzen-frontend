import { useState, useEffect } from "react";
import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://cityzen-app.herokuapp.com";
const MAPBOX_BASE_URL = "https://api.mapbox.com";
const API_TOKEN =
  "pk.eyJ1IjoiYW50aGdpYW5nIiwiYSI6ImNrOXdtNmJpZDBhem4zbG1rODNrYmxrZnAifQ.QyMjlGdfO2PcviXkyb_xVA";
axios.defaults.baseURL = BASE_URL;

export function getLogin(username, password) {
  const endpoint = BASE_URL + "/users/login";

  return axios.post(endpoint, {
    username,
    password,
  });
}

export function getUser(username) {
  const endpoint = BASE_URL + `/users/${username}`;
  return axios.get(endpoint);
}

export function useUser(username) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(/users/ + username)
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [username]);

  return {
    loading,
    userData,
    error,
  };
}

export function addUser(username, password, emailAddress) {
  const endpoint = BASE_URL + "/users/new";

  return axios.post(endpoint, {
    username,
    password,
    emailAddress,
  });
}

export function getWaypoints(journey) {
  const { origin, destination } = journey;
  if (!origin || !destination) {
    alert("Origin and Destination not specified!");
    return;
  }

  console.log(origin);
  console.log(destination);
}

export function getLongLat(name) {
  const endpoint =
    MAPBOX_BASE_URL +
    "/geocoding/v5/mapbox.places/" +
    name +
    ".json?country=AU&proximity=144.9631,-37.8136&access_token=" +
    API_TOKEN;

  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => console.log(data.features[0].geometry.coordinates));
}
