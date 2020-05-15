const BASE_URL = "https://cityzen-app.herokuapp.com";

export function getAbout() {
  const endpoint = BASE_URL + "/about";

  // return fetch call that gets about page
  return fetch(endpoint).then((res) => {
    console.log(res);
    const about = res.html();
    return about;
  });
}

export function getPlaces() {
  const endpoint = BASE_URL + "/places";

  // return fetch call that gets about page
  return fetch(endpoint).then((res) => {
    console.log(res);
    return res.json();
  });
}
