const TOKEN =
  "pk.eyJ1IjoiY2l0eXplbi1hcHAiLCJhIjoiY2thdjIyZ2Z6MmU0NjJ4cDE2NHI1bzh2NSJ9.ZFCggjeuB6rV6qnUtjHvTQ";

export function searchWaypoint(place, longitude, latitude) {
  return new Promise((resolve, reject) => {
    // search for POIs near along the route
    const searchWaypointUrl =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      place +
      ".json?proximity=" +
      longitude +
      "," +
      latitude +
      "&country=AU&access_token=" +
      TOKEN;
    fetch(searchWaypointUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features === undefined) {
          // features is undefined if the place doesnt exist
          // alert("Places could not be found");
          reject(new Error("searchWaypoint reject"));
        } else {
          console.log("searchWaypoint data:", data);
          resolve(data.features); // extract the coordinates
        }
      });
  });
}

// gets the route from a start and end latitude and longitude
export function getRoute(start, end, mode) {
  return new Promise((resolve, reject) => {
    const getRouteUrl =
      "https://api.mapbox.com/directions/v5/mapbox/" +
      mode +
      "/" +
      start[0] +
      "," +
      start[1] +
      ";" +
      end[0] +
      "," +
      end[1] +
      "?steps=true&geometries=geojson&access_token=" +
      TOKEN;
    fetch(getRouteUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.routes === undefined) {
          reject(new Error("getRoute reject"));
        } else {
          resolve(data);
        }
      });
  });
}

export async function searchRoute(origin, destination, mode, lng, lat) {

  const start = await searchWaypoint(origin, lng, lat);
  const end = await searchWaypoint(destination, lng, lat);
  const startCoordinate = start[0].geometry.coordinates;
  const endCoordinate = end[0].geometry.coordinates;

  return getRoute(startCoordinate, endCoordinate, mode);
}

/////////////////////////////////////////////////////////////////////
//  dodgy code
/////////////////////////////////////////////////////////////////////
export function getPoiRoute(start, middle, end, mode) {
  return new Promise((resolve, reject) => {
    const getRouteUrl =
      "https://api.mapbox.com/directions/v5/mapbox/" +
      mode +
      "/" +
      start[0] +
      "," +
      start[1] +
      ";" +
      middle[0] +
      "," +
      middle[1] +
      ";" +
      end[0] +
      "," +
      end[1] +
      "?steps=true&geometries=geojson&access_token=" +
      TOKEN;
    fetch(getRouteUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.routes === undefined) {
          reject(new Error("getRoute reject"));
        } else {
          resolve(data);
        }
      });
  });
}
