import { useState, useEffect } from "react";
import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://cityzen-app.herokuapp.com";
const MAPBOX_BASE_URL = "https://api.mapbox.com";
const API_TOKEN =
  "pk.eyJ1IjoiYW50aGdpYW5nIiwiYSI6ImNrOXdtNmJpZDBhem4zbG1rODNrYmxrZnAifQ.QyMjlGdfO2PcviXkyb_xVA";

// Axios documentation: https://github.com/axios/axios
// One important difference between fetch and axios is that axios's Promise automatically resolved to an Object.
// This means that you don't need to call res.json()
axios.defaults.baseURL = BASE_URL;

export function getLogin(username, password) {
  const path = "/users/login";

  return axios.post(path, {
    username,
    password,
  });
}

function getUser(username) {
  const path = /users/ + username;
  return axios.get(path);
}

export function useUser(username) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUser(username)
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
  const path = "/users/new";

  return axios.post(path, {
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
