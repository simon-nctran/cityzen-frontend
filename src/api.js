import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://cityzen-app.herokuapp.com";
const MAPBOX_BASE_URL = "https://api.mapbox.com"
const API_TOKEN = "pk.eyJ1IjoiYW50aGdpYW5nIiwiYSI6ImNrOXdtNmJpZDBhem4zbG1rODNrYmxrZnAifQ.QyMjlGdfO2PcviXkyb_xVA"

export function getLogin(username, password) {
  const endpoint = BASE_URL + "/users/login";

  return axios
    .post(endpoint, {
      username: username,
      password: password,
    })
    .then((res) => {
      console.log(res);
      const response = JSON.stringify(res);
      document.getElementById("loginOutput").innerHTML = response;
    })
    .catch((e) => {
      console.log(e);
    });
}

export function getWayoints(journey) {
  const { origin, destination, option } = journey;
  if (!origin || !destination) {
    alert("Origin and Destination not specified!");
    return;
  }
    console.log(origin);
    console.log(destination);
    getLongLat(origin);
}

export function getLongLat(name) {
  const endpoint = MAPBOX_BASE_URL + "/geocoding/v5/mapbox.places/" + name + ".json?country=AU&proximity=144.9631,-37.8136&access_token=" + API_TOKEN

  return fetch(endpoint).then(
    response => response.json()
    ).then(
    data => console.log(data.features));
}
