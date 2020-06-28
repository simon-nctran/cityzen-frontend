import { useState, useEffect } from "react";
import axios from "axios";
// Axios documentation: https://github.com/axios/axios

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
// // (note: ID should be a string)
// returns: promise that resolves to json object
// res.data will be the response ?
export function deleteFavourite(token, id) {
  const path = `/favourites/${id}`;

  return axios.delete(path, {
    headers: { "x-auth-token": token },
  });
}

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
          // console.log(res.data);
          setFavourites(
            res.data // might be wrong
          );
          setLoading(false);
        })
        .catch((err) => {
          // console.log(err);
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
