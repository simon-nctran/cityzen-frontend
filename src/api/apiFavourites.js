import { useState, useEffect } from "react";
import axios from "axios";
// Axios documentation: https://github.com/axios/axios
// One important difference between fetch and axios is that axios's Promise automatically resolved to an Object.
// This means that you don't need to call res.json()

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://cityzen-app.herokuapp.com";

axios.defaults.baseURL = BASE_URL;

// takes: auth token string
// returns: promise that resolves to json object
function getFavourites(token) {
  const path = "/favourites/";
  return axios.get(path, {
    headers: { "x-auth-token": token },
  });
}

// takes: auth token string, favourite object {origin, dest, poi, mode } check the backend!
// returns: promise that resolves to json object
// note!: res.data will be the string response corresponding to the string sent by backend
export function addFavourite(token, favourite) {
  const path = "/favourites/";

  return axios.post(path, favourite, {
    headers: { "x-auth-token": token },
  });
}

// takes: auth token string, and id of the favourite to be deleted
// // note: ID should be a string
// returns: promise that resolves to json object
// res.data will be the response ?
export function deleteFavourite(token, id) {
  // backend isn't done yet!
  console.log(token);
  console.log(id);
  const path = `/favourites/${id}`;

  console.log("DELETING A FAVOURITE");
  return axios.delete(path, {
    headers: { "x-auth-token": token },
  });
}
// suggestion: when trying to delete just remove the component/html from the frontend and hope the request is sent
// rather than actually wait for request to send and then reload page to get changes. Just change the frontend

/*
 * takes: auth token string
 * returns:
 * -- loading, a boolean
 * -- favourites, an array of favourites / null if empty
 * -- error, an error object, message accessed via error.message
 */
export function useFavourites(token) {
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token !== null) {
      setLoading(true);
      getFavourites(token)
        .then((res) => {
          console.log(res.data);
          setFavourites(
            res.data // might be wrong
          );
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setLoading(false);
        });
    }
  }, [token]);

  return {
    loading,
    favourites,
    error,
  };
}
