import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://cityzen-app.herokuapp.com";

export function getLogin(username, password) {
  const endpoint = BASE_URL + "/users/login";

  return axios
    .post(endpoint, {
      username: username,
      password: password,
    })
    .then((res) => {
      console.log(res);
      document.getElementById("loginOutput").innerHTML = JSON.stringify(res);
    })
    .catch((e) => {
      console.log(e);
    });
}

export function getDirections(journey) {
  const { origin, destination, option } = journey;
  if (!origin || !destination) {
    alert("Origin and Destination not specified!");
    return;
  }

  const endpoint = BASE_URL + `/`;

  return fetch(endpoint).then((res) => {
    console.log("Origin:", origin);
    console.log("Destination:", destination);
    return null;
  });
}
