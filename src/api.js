const BASE_URL = "https://cityzen-app.herokuapp.com";

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
